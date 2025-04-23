-- schema.sql

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT NOT NULL,
    payload BLOB NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    available_at DATETIME DEFAULT CURRENT_TIMESTAMP -- When the event can be processed next (used for backoff)
);

CREATE INDEX IF NOT EXISTS idx_events_topic_available ON events (topic, available_at);

CREATE TABLE IF NOT EXISTS event_claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    queue_name TEXT NOT NULL,
    claimed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    processing_until DATETIME NOT NULL, -- Timestamp until which this claim is valid (prevents stale claims)
    attempt_count INTEGER DEFAULT 0,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE (event_id, queue_name) -- Ensures an event is claimed by only one worker per queue at a time
);

CREATE INDEX IF NOT EXISTS idx_event_claims_queue_processing ON event_claims (queue_name, processing_until);
CREATE INDEX IF NOT EXISTS idx_event_claims_event_id ON event_claims (event_id); 