package eventbus

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/jmoiron/sqlx"
)

const (
	statusProcessing = "processing"
	statusCompleted  = "completed"
	statusFailed     = "failed"
	statusRetrying   = "retrying"
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
	Concurrency  int
	MaxRetries   int
	Backoff      func(retry int) time.Duration
	PollInterval time.Duration
}

type EventBus struct {
	db *sqlx.DB
}

type Event struct {
	ID        int64     `db:"id"`
	Name      string    `db:"name"`
	Payload   string    `db:"payload"`
	CreatedAt time.Time `db:"created_at"`
}

type EventProcessing struct {
	EventID      int64      `db:"event_id"`
	Subscriber   string     `db:"subscriber"`
	Status       string     `db:"status"`
	RetryCount   int        `db:"retry_count"`
	CreatedAt    time.Time  `db:"created_at"`
	ErrorMessage *string    `db:"error_message"`
	LastAttempt  time.Time  `db:"last_attempt"`
	NextAttempt  *time.Time `db:"next_attempt"`
}

func New(db *sqlx.DB) (*EventBus, error) {
	bus := &EventBus{db: db}
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
		`CREATE TABLE IF NOT EXISTS subscriber_offsets (
            subscriber TEXT NOT NULL,
            topic TEXT NOT NULL,
            last_consumed_id INTEGER NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(subscriber, topic)
        )`,
		`CREATE TABLE IF NOT EXISTS event_processing (
            event_id INTEGER NOT NULL,
            subscriber TEXT NOT NULL,
            status TEXT NOT NULL,
            retry_count INTEGER DEFAULT 0,
            error_message TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_attempt DATETIME DEFAULT CURRENT_TIMESTAMP,
            next_attempt DATETIME,
            PRIMARY KEY(event_id, subscriber)
        )`,
	}

	for _, query := range queries {
		if _, err := b.db.Exec(query); err != nil {
			return err
		}
	}
	return nil
}

func (b *EventBus) Publish(ctx context.Context, topic string, payload interface{}) error {
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return errutil.Wrap(err, "failed to marshal payload")
	}

	query := `INSERT INTO events (topic, payload) VALUES (?, ?)`
	_, err = b.db.ExecContext(ctx, query, topic, string(payloadBytes))
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
	for i := 0; i < opts.Concurrency; i++ {
		go b.worker(ctx, queueName, handler, jobs, opts)
	}

	// Start the poller
	go b.pollEvents(ctx, topic, queueName, jobs, opts)

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
				fmt.Printf("Error fetching events: %v\n", err)
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

	var lastConsumedID int64
	err = tx.GetContext(ctx, &lastConsumedID,
		`SELECT last_consumed_id FROM subscriber_offsets WHERE subscriber = ? AND topic = ?`,
		queueName, topic)
	if err == sql.ErrNoRows {
		lastConsumedID = 0
	} else if err != nil {
		return errutil.Wrap(err, "failed to get last consumed ID")
	}

	var eventsToProcess []Event
	err = tx.SelectContext(ctx, &eventsToProcess,
		`SELECT id, name, payload, created_at FROM events 
         WHERE id > ? AND name = ? 
         ORDER BY id ASC LIMIT ?`,
		lastConsumedID, topic, opts.Concurrency)
	if err != nil {
		return errutil.Wrap(err, "failed to fetch events")
	}

	for _, event := range eventsToProcess {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case jobs <- event:
			// Event sent to worker
		default:
			// Channel is full, wait for next poll
			return nil
		}
	}

	return tx.Commit()
}

func (b *EventBus) worker(ctx context.Context, queueName string, handler Handler, jobs <-chan Event, opts Options) {
	for event := range jobs {
		select {
		case <-ctx.Done():
			return
		default:
			if err := b.processEvent(ctx, event, queueName, handler, opts); err != nil {
				fmt.Printf("Error processing event %d: %v\n", event.ID, err)
			}
		}
	}
}

func (b *EventBus) processEvent(ctx context.Context, event Event, queueName string, handler Handler, opts Options) error {
	tx, err := b.db.BeginTxx(ctx, nil)
	if err != nil {
		return errutil.Wrap(err, "failed to begin transaction")
	}
	defer tx.Rollback()

	var processing EventProcessing
	err = tx.GetContext(ctx, &processing,
		`SELECT * FROM event_processing WHERE event_id = ? AND subscriber = ?`,
		event.ID, queueName)

	if err == sql.ErrNoRows {
		processing = EventProcessing{
			EventID:     event.ID,
			Subscriber:  queueName,
			Status:      statusProcessing,
			LastAttempt: time.Now(),
		}
		_, err = tx.ExecContext(ctx,
			`INSERT INTO event_processing (event_id, subscriber, status, last_attempt) 
             VALUES (?, ?, ?, ?)`,
			processing.EventID, processing.Subscriber, processing.Status, processing.LastAttempt)
		if err != nil {
			return errutil.Wrap(err, "failed to insert event processing")
		}
	} else if err != nil {
		return errutil.Wrap(err, "failed to get event processing")
	} else if processing.Status == statusCompleted {
		return nil
	} else if processing.RetryCount >= opts.MaxRetries {
		return nil
	}

	err = handler(ctx, []byte(event.Payload))
	if err != nil {
		retryCount := processing.RetryCount + 1
		nextAttempt := time.Now().Add(opts.Backoff(retryCount))
		status := statusFailed

		// If the error is retriable and we haven't exceeded max retries, mark it for retry
		if IsRetriable(err) && retryCount < opts.MaxRetries {
			status = statusRetrying
		}

		_, err = tx.ExecContext(ctx,
			`UPDATE event_processing 
             SET status = ?, retry_count = ?, error_message = ?, next_attempt = ? 
             WHERE event_id = ? AND subscriber = ?`,
			status, retryCount, err.Error(), nextAttempt, event.ID, queueName)
		if err != nil {
			return errutil.Wrap(err, "failed to update event processing")
		}
		return err
	}

	_, err = tx.ExecContext(ctx,
		`UPDATE event_processing SET status = ? WHERE event_id = ? AND subscriber = ?`,
		statusCompleted, event.ID, queueName)
	if err != nil {
		return errutil.Wrap(err, "failed to update event processing status")
	}

	_, err = tx.ExecContext(ctx,
		`INSERT INTO subscriber_offsets (subscriber, topic, last_consumed_id) 
         VALUES (?, ?, ?) 
         ON CONFLICT(subscriber, topic) 
         DO UPDATE SET last_consumed_id = ?, updated_at = CURRENT_TIMESTAMP`,
		queueName, event.Name, event.ID, event.ID)
	if err != nil {
		return errutil.Wrap(err, "failed to update subscriber offset")
	}

	return tx.Commit()
}
