package eventbus

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"math/rand"
	"sync"
	"testing"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupTestDB(t *testing.T) *sqlx.DB {
	db, err := sqlx.Open("sqlite3", "file:testdb?cache=shared&_busy_timeout=10000&_journal=WAL&_synchronous=NORMAL&_txlock=immediate")
	require.NoError(t, err)
	t.Cleanup(func() {
		db.Close()
		// os.Remove("testdb")
	})

	db.SetMaxOpenConns(1)
	return db
}

func TestEventBus_BasicOperations(t *testing.T) {
	db := setupTestDB(t)
	bus, err := New(db, slog.Default())
	require.NoError(t, err)

	ctx := context.Background()

	t.Run("publish and subscribe single event", func(t *testing.T) {
		// Setup
		var receivedEvent bool
		handler := func(ctx context.Context, payload []byte) error {
			receivedEvent = true
			return nil
		}

		// Subscribe
		err := bus.Subscribe(ctx, "test_topic", "test_queue", handler, Options{
			Concurrency:       1,
			MaxRetries:        3,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      time.Millisecond,
			StaleTimeout:      time.Second,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		// Publish
		err = bus.Publish(ctx, "test_topic", map[string]string{"test": "data"})
		require.NoError(t, err)

		// Wait for event to be processed
		time.Sleep(100 * time.Millisecond)
		assert.True(t, receivedEvent)
	})

	t.Run("publish multiple events", func(t *testing.T) {
		var receivedCount int
		handler := func(ctx context.Context, payload []byte) error {
			receivedCount++
			return nil
		}

		err := bus.Subscribe(ctx, "multi_topic", "multi_queue", handler, Options{
			Concurrency:       1,
			MaxRetries:        3,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      time.Millisecond,
			StaleTimeout:      time.Second,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		// Publish multiple events
		for i := 0; i < 5; i++ {
			err = bus.Publish(ctx, "multi_topic", map[string]int{"count": i})
			require.NoError(t, err)
		}

		// Wait for events to be processed
		time.Sleep(500 * time.Millisecond)
		assert.Equal(t, 5, receivedCount)
	})
}

func TestEventBus_ErrorHandling(t *testing.T) {
	db := setupTestDB(t)
	bus, err := New(db, slog.Default())
	require.NoError(t, err)

	ctx := context.Background()

	t.Run("retriable error handling", func(t *testing.T) {
		var attemptCount int
		handler := func(ctx context.Context, payload []byte) error {
			attemptCount++
			if attemptCount < 3 {
				return NewRetriableError(errors.New("temporary error"))
			}
			return nil
		}

		err := bus.Subscribe(ctx, "retry_topic", "retry_queue", handler, Options{
			Concurrency:       1,
			MaxRetries:        5,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      10 * time.Millisecond,
			StaleTimeout:      time.Second,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		err = bus.Publish(ctx, "retry_topic", map[string]string{"test": "data"})
		require.NoError(t, err)

		// Wait for retries
		time.Sleep(500 * time.Millisecond)
		assert.Equal(t, 3, attemptCount)
	})

	t.Run("non-retriable error handling", func(t *testing.T) {
		var attemptCount int
		handler := func(ctx context.Context, payload []byte) error {
			attemptCount++
			return errors.New("permanent error")
		}

		err := bus.Subscribe(ctx, "fail_topic", "fail_queue", handler, Options{
			Concurrency:       1,
			MaxRetries:        3,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      time.Millisecond,
			StaleTimeout:      time.Second,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		err = bus.Publish(ctx, "fail_topic", map[string]string{"test": "data"})
		require.NoError(t, err)

		// Wait for processing
		time.Sleep(500 * time.Millisecond)
		assert.Equal(t, 1, attemptCount)
	})
}

func TestEventBus_Concurrency(t *testing.T) {
	db := setupTestDB(t)
	bus, err := New(db, slog.Default())
	require.NoError(t, err)

	ctx := context.Background()

	t.Run("multiple subscribers same topic", func(t *testing.T) {
		var (
			subscriber1Count int
			subscriber2Count int
			mutex1           sync.Mutex
			mutex2           sync.Mutex
		)

		handler1 := func(ctx context.Context, payload []byte) error {
			mutex1.Lock()
			subscriber1Count++
			mutex1.Unlock()
			return nil
		}

		handler2 := func(ctx context.Context, payload []byte) error {
			mutex2.Lock()
			subscriber2Count++
			mutex2.Unlock()
			return nil
		}

		// Subscribe first consumer
		err := bus.Subscribe(ctx, "concurrent_topic", "queue1", handler1, Options{
			Concurrency:       2,
			MaxRetries:        3,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      time.Millisecond,
			StaleTimeout:      time.Second,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		// Subscribe second consumer
		err = bus.Subscribe(ctx, "concurrent_topic", "queue2", handler2, Options{
			Concurrency:       2,
			MaxRetries:        3,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      time.Millisecond,
			StaleTimeout:      time.Second,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		// Publish multiple events
		for i := 0; i < 10; i++ {
			err = bus.Publish(ctx, "concurrent_topic", map[string]int{"count": i})
			require.NoError(t, err)
		}

		// Wait for processing
		time.Sleep(1 * time.Second)
		assert.Equal(t, 10, subscriber1Count)
		assert.Equal(t, 10, subscriber2Count)
	})

	t.Run("high concurrency processing", func(t *testing.T) {
		var (
			processedCount int
			mutex          sync.Mutex
		)

		handler := func(ctx context.Context, payload []byte) error {
			mutex.Lock()
			processedCount++
			mutex.Unlock()
			// Simulate some work
			time.Sleep(10 * time.Millisecond)
			return nil
		}

		err := bus.Subscribe(ctx, "high_concurrency_topic", "high_concurrency_queue", handler, Options{
			Concurrency:       10,
			MaxRetries:        3,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      time.Millisecond,
			StaleTimeout:      time.Second,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		// Publish many events
		for i := 0; i < 50; i++ {
			err = bus.Publish(ctx, "high_concurrency_topic", map[string]int{"count": i})
			require.NoError(t, err)
		}

		// Wait for processing
		time.Sleep(2 * time.Second)
		assert.Equal(t, 50, processedCount)
	})
}

func TestEventBus_EdgeCases(t *testing.T) {
	db := setupTestDB(t)
	bus, err := New(db, slog.Default())
	require.NoError(t, err)

	ctx := context.Background()

	t.Run("stale event recovery", func(t *testing.T) {
		var processedCount int
		handler := func(ctx context.Context, payload []byte) error {
			processedCount++
			return nil
		}

		err := bus.Subscribe(ctx, "stale_topic", "stale_queue", handler, Options{
			Concurrency:       1,
			MaxRetries:        3,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      time.Millisecond,
			StaleTimeout:      time.Millisecond,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		// Publish an event
		err = bus.Publish(ctx, "stale_topic", map[string]string{"test": "data"})
		require.NoError(t, err)

		// Wait for event to become stale and be recovered
		time.Sleep(500 * time.Millisecond)
		assert.Equal(t, 1, processedCount)
	})

	t.Run("context cancellation", func(t *testing.T) {
		ctx, cancel := context.WithCancel(ctx)
		var processedCount int

		handler := func(ctx context.Context, payload []byte) error {
			processedCount++
			return nil
		}

		err := bus.Subscribe(ctx, "cancel_topic", "cancel_queue", handler, Options{
			Concurrency:       1,
			MaxRetries:        3,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      time.Millisecond,
			StaleTimeout:      time.Second,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		// Publish an event
		err = bus.Publish(ctx, "cancel_topic", map[string]string{"test": "data"})
		require.NoError(t, err)

		// Cancel context
		cancel()

		// Wait a bit
		time.Sleep(100 * time.Millisecond)

		// Publish another event
		err = bus.Publish(context.Background(), "cancel_topic", map[string]string{"test": "data"})
		require.NoError(t, err)

		// Wait for processing
		time.Sleep(100 * time.Millisecond)
		assert.Equal(t, 1, processedCount) // Only one event should be processed
	})

	t.Run("large payload handling", func(t *testing.T) {
		var receivedPayload []byte
		handler := func(ctx context.Context, payload []byte) error {
			receivedPayload = payload
			return nil
		}

		err := bus.Subscribe(ctx, "large_payload_topic", "large_payload_queue", handler, Options{
			Concurrency:       1,
			MaxRetries:        3,
			Backoff:           func(retry int) time.Duration { return time.Millisecond },
			PollInterval:      time.Millisecond,
			StaleTimeout:      time.Second,
			HeartbeatInterval: time.Millisecond,
		})
		require.NoError(t, err)

		// Create a large payload
		largePayload := make(map[string]string)
		for i := 0; i < 1000; i++ {
			largePayload[randString(10)] = randString(100)
		}

		err = bus.Publish(ctx, "large_payload_topic", largePayload)
		require.NoError(t, err)

		// Wait for processing
		time.Sleep(100 * time.Millisecond)

		var decodedPayload map[string]string
		err = json.Unmarshal(receivedPayload, &decodedPayload)
		require.NoError(t, err)
		assert.Equal(t, len(largePayload), len(decodedPayload))
	})
}

// Helper function to generate random strings
func randString(n int) string {
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	b := make([]byte, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}
