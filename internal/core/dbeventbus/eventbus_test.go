package eventbus

import (
	"context"
	"encoding/json"
	"errors"
	"testing"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// testDB returns a new in-memory SQLite database for testing
func testDB(t *testing.T) *sqlx.DB {
	db, err := sqlx.Open("sqlite3", "file:testdb?mode=memory&cache=shared&_busy_timeout=10000&_journal=WAL&_synchronous=NORMAL")
	require.NoError(t, err)
	t.Cleanup(func() {
		db.Close()
	})
	db.SetMaxOpenConns(1)
	return db
}

// testEventBus creates a new EventBus instance with test options
func testEventBus(t *testing.T, db *sqlx.DB) *EventBus {
	bus, err := New(db)
	require.NoError(t, err)
	return bus
}

// testOptions returns default test options
func testOptions() Options {
	return Options{
		Concurrency:  2,
		MaxRetries:   3,
		Backoff:      func(retry int) time.Duration { return time.Millisecond * 100 },
		PollInterval: time.Millisecond * 100,
		StaleTimeout: time.Second,
	}
}

// waitForEvent waits for an event to be processed with a timeout
func waitForEvent(t *testing.T, ctx context.Context, bus *EventBus, eventID int64, queueName string, timeout time.Duration) EventProcessing {
	var processing EventProcessing
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		err := bus.db.GetContext(ctx, &processing,
			`SELECT * FROM event_processing WHERE event_id = ? AND subscriber = ?`,
			eventID, queueName)
		if err == nil && processing.Status == statusCompleted {
			return processing
		}
		time.Sleep(time.Millisecond * 10)
	}
	t.Fatalf("timeout waiting for event %d to complete", eventID)
	return processing
}

func TestEventBus_Basic(t *testing.T) {
	db := testDB(t)
	bus := testEventBus(t, db)
	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(func() {
		cancel()
	})
	opts := testOptions()

	// Test publishing and subscribing
	processed := make(chan bool)
	handler := func(ctx context.Context, payload []byte) error {
		var data map[string]interface{}
		err := json.Unmarshal(payload, &data)
		require.NoError(t, err)
		assert.Equal(t, "test", data["message"])
		processed <- true
		return nil
	}

	err := bus.Subscribe(ctx, "test-topic", "test-queue", handler, opts)
	require.NoError(t, err)

	err = bus.Publish(ctx, "test-topic", map[string]interface{}{"message": "test"})
	require.NoError(t, err)

	select {
	case <-processed:
		// Success
	case <-time.After(time.Second):
		t.Fatal("timeout waiting for event processing")
	}
}

func TestEventBus_Retries(t *testing.T) {
	db := testDB(t)
	bus := testEventBus(t, db)
	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(func() {
		cancel()
	})
	opts := testOptions()

	attempts := 0
	handler := func(ctx context.Context, payload []byte) error {
		attempts++
		if attempts < 3 {
			return NewRetriableError(errors.New("temporary error"))
		}
		return nil
	}

	err := bus.Subscribe(ctx, "test-topic", "test-queue", handler, opts)
	require.NoError(t, err)

	err = bus.Publish(ctx, "test-topic", map[string]interface{}{"message": "test"})
	require.NoError(t, err)

	// Wait for the event to be processed
	time.Sleep(time.Second)

	assert.Equal(t, 3, attempts, "handler should be called exactly 3 times")
}

func TestEventBus_MaxRetries(t *testing.T) {
	db := testDB(t)
	bus := testEventBus(t, db)
	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(func() {
		cancel()
	})
	opts := testOptions()

	attempts := 0
	handler := func(ctx context.Context, payload []byte) error {
		attempts++
		return NewRetriableError(errors.New("permanent error"))
	}

	err := bus.Subscribe(ctx, "test-topic", "test-queue", handler, opts)
	require.NoError(t, err)

	err = bus.Publish(ctx, "test-topic", map[string]interface{}{"message": "test"})
	require.NoError(t, err)

	// Wait for max retries
	time.Sleep(time.Second)

	assert.Equal(t, opts.MaxRetries, attempts, "handler should be called max retries + 1 times")

	// Verify the event is marked as failed
	var processing EventProcessing
	err = bus.db.GetContext(ctx, &processing,
		`SELECT * FROM event_processing WHERE subscriber = ? ORDER BY event_id DESC LIMIT 1`,
		"test-queue")
	require.NoError(t, err)
	assert.Equal(t, statusFailed, processing.Status)
}

func TestEventBus_StaleEvents(t *testing.T) {
	db := testDB(t)
	bus := testEventBus(t, db)
	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(func() {
		cancel()
	})
	opts := testOptions()

	// Create a stale processing event
	_, err := db.ExecContext(ctx,
		`INSERT INTO events (name, payload) VALUES (?, ?)`,
		"test-topic", `{"message": "test"}`)
	require.NoError(t, err)

	var eventID int64
	err = db.GetContext(ctx, &eventID, "SELECT last_insert_rowid()")
	require.NoError(t, err)

	_, err = db.ExecContext(ctx,
		`INSERT INTO event_processing (event_id, subscriber, status, last_attempt) 
         VALUES (?, ?, ?, datetime('now', '-2 minutes'))`,
		eventID, "test-queue", statusProcessing)
	require.NoError(t, err)

	processed := make(chan bool)
	handler := func(ctx context.Context, payload []byte) error {
		processed <- true
		return nil
	}

	err = bus.Subscribe(ctx, "test-topic", "test-queue", handler, opts)
	require.NoError(t, err)

	select {
	case <-processed:
		// Success
	case <-time.After(time.Second):
		t.Fatal("timeout waiting for stale event processing")
	}
}

func TestEventBus_Concurrency(t *testing.T) {
	db := testDB(t)
	bus := testEventBus(t, db)
	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(func() {
		cancel()
	})
	opts := testOptions()

	// Create multiple events
	for i := 0; i < 5; i++ {
		err := bus.Publish(ctx, "test-topic", map[string]interface{}{"message": i})
		require.NoError(t, err)
	}

	processed := make(chan int)
	handler := func(ctx context.Context, payload []byte) error {
		var data map[string]interface{}
		err := json.Unmarshal(payload, &data)
		require.NoError(t, err)
		processed <- int(data["message"].(float64))
		return nil
	}

	err := bus.Subscribe(ctx, "test-topic", "test-queue", handler, opts)
	require.NoError(t, err)

	// Wait for all events to be processed
	received := make(map[int]bool)
	for i := 0; i < 5; i++ {
		select {
		case msg := <-processed:
			received[msg] = true
		case <-time.After(time.Second):
			t.Fatal("timeout waiting for event processing")
		}
	}

	assert.Len(t, received, 5, "should process all events")
}

func TestEventBus_ContextCancellation(t *testing.T) {
	db := testDB(t)
	bus := testEventBus(t, db)
	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(func() {
		cancel()
	})
	opts := testOptions()

	processed := make(chan bool)
	handler := func(ctx context.Context, payload []byte) error {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(time.Millisecond * 50):
			processed <- true
			return nil
		}
	}

	err := bus.Subscribe(ctx, "test-topic", "test-queue", handler, opts)
	require.NoError(t, err)

	err = bus.Publish(ctx, "test-topic", map[string]interface{}{"message": "test"})
	require.NoError(t, err)

	// Cancel context after a short delay
	go func() {
		time.Sleep(time.Millisecond * 25)
		cancel()
	}()

	select {
	case <-processed:
		t.Fatal("handler should not complete after context cancellation")
	case <-time.After(time.Second):
		// Success - handler was cancelled
	}
}
