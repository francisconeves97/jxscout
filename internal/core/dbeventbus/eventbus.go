package dbeventbus

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/jmoiron/sqlx"
)

const (
	statusProcessing = "processing"
	statusCompleted  = "completed"
	statusFailed     = "failed"
	statusRetry      = "retry"
	statusPending    = "pending"
)

// RetriableError wraps an error that should be retried
type RetriableError struct {
	Err error
}

func (e *RetriableError) Error() string {
	return e.Err.Error()
}

func (e *RetriableError) Unwrap() error {
	return e.Err
}

// NewRetriableError creates a new retriable error
func NewRetriableError(err error) error {
	return &RetriableError{Err: err}
}

// IsRetriable checks if an error is retriable
func IsRetriable(err error) bool {
	var retriable *RetriableError
	return err != nil && errors.As(err, &retriable)
}

type Options struct {
	Concurrency       int
	MaxRetries        int
	Backoff           func(retry int) time.Duration
	PollInterval      time.Duration
	HeartbeatInterval time.Duration
}

type EventBus struct {
	db  *sqlx.DB
	log *slog.Logger
}

type Event struct {
	ID        int64     `db:"id"`
	Name      string    `db:"name"`
	Payload   string    `db:"payload"`
	CreatedAt time.Time `db:"created_at"`
}

type EventProcessing struct {
	EventID     int64     `db:"event_id"`
	Subscriber  string    `db:"subscriber"`
	Status      string    `db:"status"`
	RetryCount  int       `db:"retry_count"`
	CreatedAt   time.Time `db:"created_at"`
	Heartbeat   time.Time `db:"heartbeat"`
	LastAttempt time.Time `db:"last_attempt"`

	ErrorMessage *string    `db:"error_message"`
	FinishedAt   *time.Time `db:"finished_at"`
	NextAttempt  *time.Time `db:"next_attempt"`
}

func NewEventBus(db *sqlx.DB, log *slog.Logger) (*EventBus, error) {
	bus := &EventBus{db: db, log: log}
	if err := bus.initTables(); err != nil {
		return nil, errutil.Wrap(err, "failed to initialize tables")
	}
	return bus, nil
}

func (b *EventBus) initTables() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            payload TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
		`CREATE TABLE IF NOT EXISTS event_processing (
            event_id INTEGER NOT NULL,
            subscriber TEXT NOT NULL,
            status TEXT NOT NULL,
            retry_count INTEGER DEFAULT 0,
            error_message TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			heartbeat DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_attempt DATETIME DEFAULT CURRENT_TIMESTAMP,
			finished_at DATETIME,
            next_attempt DATETIME,
            PRIMARY KEY(event_id, subscriber)
        )`,
		`
		CREATE INDEX IF NOT EXISTS idx_events_name ON events(name);
		CREATE INDEX IF NOT EXISTS idx_event_processing_status ON event_processing(status);
		CREATE INDEX IF NOT EXISTS idx_event_processing_subscriber_status ON event_processing(subscriber, status);
		`,
	}

	for _, query := range queries {
		if _, err := b.db.Exec(query); err != nil {
			return err
		}
	}
	return nil
}

func (b *EventBus) Publish(ctx context.Context, tx sqlx.ExecerContext, topic string, payload interface{}) error {
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return errutil.Wrap(err, "failed to marshal payload")
	}

	b.log.DebugContext(ctx, "Publishing event", "topic", topic, "payload_size", len(payloadBytes))

	query := `INSERT INTO events (name, payload) VALUES (?, ?)`
	_, err = tx.ExecContext(ctx, query, topic, string(payloadBytes))
	if err != nil {
		return errutil.Wrap(err, "failed to publish event")
	}
	return nil
}

type Handler func(ctx context.Context, payload []byte) error

func (b *EventBus) Subscribe(ctx context.Context, topic, queueName string, handler Handler, opts Options) error {
	// Create a channel for distributing work
	jobs := make(chan Event, opts.Concurrency)

	// Start worker pool
	for range opts.Concurrency {
		go b.worker(ctx, queueName, handler, jobs, opts)
	}

	// Start the poller
	go b.pollEvents(ctx, topic, queueName, jobs, opts)

	// Start the cleanup goroutine for stale events
	go b.cleanupStaleEvents(ctx, queueName, opts.HeartbeatInterval)

	// Start the cleanup goroutine for completed events
	go b.cleanupCompletedEvents(ctx)

	return nil
}

func (b *EventBus) pollEvents(ctx context.Context, topic, queueName string, jobs chan<- Event, opts Options) {
	ticker := time.NewTicker(opts.PollInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			close(jobs)
			return
		case <-ticker.C:
			if err := b.fetchAndDistributeEvents(ctx, topic, queueName, jobs, opts); err != nil {
				b.log.ErrorContext(ctx, "Error fetching events", "error", err)
			}
		}
	}
}

func (b *EventBus) fetchAndDistributeEvents(ctx context.Context, topic, queueName string, jobs chan<- Event, opts Options) error {
	tx, err := b.db.BeginTxx(ctx, nil)
	if err != nil {
		return errutil.Wrap(err, "failed to begin transaction")
	}
	defer tx.Rollback()

	// To noisy: re-add and compile for debugging
	// b.log.DebugContext(ctx, "Fetching events for processing", "topic", topic, "queue", queueName, "concurrency", opts.Concurrency)

	// Get multiple events that are ready to be processed and lock them
	var eventsToProcess []Event
	err = tx.SelectContext(ctx, &eventsToProcess,
		`SELECT e.id, e.name, e.payload, e.created_at 
         FROM events e
         LEFT JOIN event_processing ep ON e.id = ep.event_id AND ep.subscriber = ?
         WHERE e.name = ?
         AND (
             ep.status IS NULL 
             OR ep.status = ?
             OR (ep.status = ? AND ep.retry_count < ? AND ep.next_attempt < CURRENT_TIMESTAMP)
         )
         ORDER BY ep.retry_count ASC, e.id ASC LIMIT ?`,
		queueName, topic, statusPending, statusRetry, opts.MaxRetries, opts.Concurrency)
	if err != nil {
		return errutil.Wrap(err, "failed to fetch events")
	}

	if len(eventsToProcess) > 0 {
		b.log.DebugContext(ctx, "Found events to process", "count", len(eventsToProcess), "topic", topic, "queue", queueName)
	}

	// Send events to workers after transaction is committed
	for _, event := range eventsToProcess {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case jobs <- event:
			b.log.DebugContext(ctx, "Distributing event to worker", "event_id", event.ID, "topic", event.Name)
			_, err = tx.ExecContext(ctx,
				`INSERT INTO event_processing (event_id, subscriber, status, last_attempt, heartbeat, finished_at) 
				 VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)
				 ON CONFLICT(event_id, subscriber) DO UPDATE SET status = ?, last_attempt = CURRENT_TIMESTAMP, heartbeat = CURRENT_TIMESTAMP, finished_at = NULL`,
				event.ID, queueName, statusProcessing, statusProcessing)
			if err != nil {
				return errutil.Wrap(err, "failed to mark event as processing")
			}
		default:
			// Commit the transaction before sending to workers
			if err := tx.Commit(); err != nil {
				return errutil.Wrap(err, "failed to commit transaction")
			}
			return nil
		}
	}

	// Commit the transaction before sending to workers
	if err := tx.Commit(); err != nil {
		return errutil.Wrap(err, "failed to commit transaction")
	}

	return nil
}

func (b *EventBus) worker(ctx context.Context, queueName string, handler Handler, jobs <-chan Event, opts Options) {
	for event := range jobs {
		select {
		case <-ctx.Done():
			return
		default:
			if err := b.processEvent(ctx, event, queueName, handler, opts); err != nil {
				b.log.ErrorContext(ctx, "Error processing event", "event_id", event.ID, "error", err)
			}
		}

	}
}

func (b *EventBus) processEvent(ctx context.Context, event Event, queueName string, handler Handler, opts Options) error {
	b.log.DebugContext(ctx, "Starting event processing", "event_id", event.ID, "topic", event.Name, "queue", queueName)

	// Create a context for the heartbeat goroutine
	heartbeatCtx, cancelHeartbeat := context.WithCancel(ctx)
	defer cancelHeartbeat()

	// Start heartbeat goroutine
	b.startHeartbeat(heartbeatCtx, event.ID, queueName, opts.HeartbeatInterval)

	// Execute handler outside of transaction
	err := handler(ctx, []byte(event.Payload))
	if err != nil {
		b.log.ErrorContext(ctx, "Error processing event", "event_id", event.ID, "queue_name", queueName, "error", err)
	} else {
		b.log.DebugContext(ctx, "Event processed successfully", "event_id", event.ID, "topic", event.Name, "queue", queueName)
	}

	// Update final status
	if err := b.updateEventStatus(ctx, event, queueName, err, opts); err != nil {
		return errutil.Wrap(err, "failed to update event status")
	}

	return nil
}

func (b *EventBus) startHeartbeat(ctx context.Context, eventID int64, queueName string, interval time.Duration) {
	go func() {
		ticker := time.NewTicker(interval)
		defer ticker.Stop()

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				_, err := b.db.ExecContext(ctx,
					`UPDATE event_processing SET heartbeat = CURRENT_TIMESTAMP 
					 WHERE event_id = ? AND subscriber = ?`,
					eventID, queueName)
				if err != nil {
					b.log.ErrorContext(ctx, "Error updating heartbeat for event", "event_id", eventID, "error", err)
				}
			}
		}
	}()
}

func (b *EventBus) updateEventStatus(ctx context.Context, event Event, queueName string, handlerErr error, opts Options) error {
	tx, err := b.db.BeginTxx(ctx, nil)
	if err != nil {
		return errutil.Wrap(err, "failed to begin final status transaction")
	}
	defer tx.Rollback()

	var processing EventProcessing
	err = tx.GetContext(ctx, &processing,
		`SELECT * FROM event_processing WHERE event_id = ? AND subscriber = ?`,
		event.ID, queueName)
	if err != nil {
		return errutil.Wrap(err, "failed to get event processing")
	}

	if handlerErr != nil {
		if err := b.updateFailedStatus(ctx, tx, handlerErr, processing, opts); err != nil {
			return errutil.Wrap(err, "failed to update failed status")
		}
		return nil
	}

	if err := b.updateCompletedStatus(ctx, tx, event, queueName); err != nil {
		return errutil.Wrap(err, "failed to update completed status")
	}
	return nil
}

func (b *EventBus) updateFailedStatus(ctx context.Context, tx *sqlx.Tx, handlerErr error, processing EventProcessing, opts Options) error {
	retryCount := processing.RetryCount + 1
	nextAttempt := time.Now().UTC().Add(opts.Backoff(retryCount))
	status := statusFailed

	if IsRetriable(handlerErr) && retryCount < opts.MaxRetries {
		status = statusRetry
		b.log.DebugContext(ctx, "Event will be retried",
			"event_id", processing.EventID,
			"retry_count", retryCount,
			"next_attempt", nextAttempt,
			"error", handlerErr)
	} else {
		b.log.DebugContext(ctx, "Event failed permanently",
			"event_id", processing.EventID,
			"retry_count", retryCount,
			"error", handlerErr)
	}

	_, err := tx.ExecContext(ctx,
		`UPDATE event_processing 
         SET status = ?, retry_count = ?, error_message = ?, next_attempt = ?, finished_at = CURRENT_TIMESTAMP
         WHERE event_id = ? AND subscriber = ?`,
		status, retryCount, handlerErr.Error(), nextAttempt, processing.EventID, processing.Subscriber)
	if err != nil {
		return errutil.Wrap(err, "failed to update event processing")
	}

	if err := tx.Commit(); err != nil {
		return errutil.Wrap(err, "failed to commit failed status transaction")
	}
	return nil
}

func (b *EventBus) updateCompletedStatus(ctx context.Context, tx *sqlx.Tx, event Event, queueName string) error {
	_, err := tx.ExecContext(ctx,
		`UPDATE event_processing SET status = ?, finished_at = CURRENT_TIMESTAMP WHERE event_id = ? AND subscriber = ?`,
		statusCompleted, event.ID, queueName)
	if err != nil {
		return errutil.Wrap(err, "failed to update event processing status")
	}

	if err := tx.Commit(); err != nil {
		return errutil.Wrap(err, "failed to commit completed status transaction")
	}
	return nil
}

// cleanupStaleEvents periodically checks for events that have missed too many heartbeats
// and resets them to pending status
func (b *EventBus) cleanupStaleEvents(ctx context.Context, queueName string, heartbeatInterval time.Duration) {
	ticker := time.NewTicker(10 * heartbeatInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if err := b.resetStaleEvents(ctx, queueName, heartbeatInterval); err != nil {
				b.log.ErrorContext(ctx, "Error cleaning up stale events", "error", err)
			}
		}
	}
}

// resetStaleEvents finds and resets events that have missed too many heartbeats
func (b *EventBus) resetStaleEvents(ctx context.Context, queueName string, heartbeatInterval time.Duration) error {
	tx, err := b.db.BeginTxx(ctx, nil)
	if err != nil {
		return errutil.Wrap(err, "failed to begin transaction")
	}
	defer tx.Rollback()

	// Calculate the cutoff time for stale events (10 missed heartbeats)
	staleCutoff := time.Now().UTC().Add(-10 * heartbeatInterval)

	b.log.DebugContext(ctx, "Checking for stale events",
		"queue", queueName,
		"stale_cutoff", staleCutoff,
		"heartbeat_interval", heartbeatInterval)

	_, err = tx.ExecContext(ctx,
		`UPDATE event_processing 
         SET status = ?, heartbeat = CURRENT_TIMESTAMP, finished_at = NULL, next_attempt = NULL
         WHERE subscriber = ? 
         AND status = ? 
         AND heartbeat < ?`,
		statusPending, queueName, statusProcessing, staleCutoff)
	if err != nil {
		return errutil.Wrap(err, "failed to reset stale events")
	}

	if err := tx.Commit(); err != nil {
		return errutil.Wrap(err, "failed to commit transaction")
	}

	return nil
}

// cleanupCompletedEvents periodically deletes events that were completed more than 1 day ago
func (b *EventBus) cleanupCompletedEvents(ctx context.Context) {
	ticker := time.NewTicker(30 * time.Minute)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if err := b.deleteOldCompletedEvents(ctx); err != nil {
				b.log.ErrorContext(ctx, "Error cleaning up completed events", "error", err)
			}
		}
	}
}

// deleteOldCompletedEvents deletes events that were completed more than 1 day ago
func (b *EventBus) deleteOldCompletedEvents(ctx context.Context) error {
	tx, err := b.db.BeginTxx(ctx, nil)
	if err != nil {
		return errutil.Wrap(err, "failed to begin transaction")
	}
	defer tx.Rollback()

	// Calculate the cutoff time (1 day ago)
	cutoff := time.Now().UTC().Add(-24 * time.Hour)

	b.log.DebugContext(ctx, "Cleaning up completed events", "cutoff", cutoff)

	// First delete from event_processing table
	_, err = tx.ExecContext(ctx,
		`DELETE FROM event_processing 
         WHERE status = ? 
         AND finished_at < ?`,
		statusCompleted, cutoff)
	if err != nil {
		return errutil.Wrap(err, "failed to delete old completed event processing records")
	}

	// Then delete from events table where there are no remaining event_processing records
	_, err = tx.ExecContext(ctx,
		`DELETE FROM events 
         WHERE id NOT IN (SELECT event_id FROM event_processing) 
         AND created_at < ?`,
		cutoff)
	if err != nil {
		return errutil.Wrap(err, "failed to delete old completed events")
	}

	if err := tx.Commit(); err != nil {
		return errutil.Wrap(err, "failed to commit transaction")
	}

	return nil
}
