package cache

import (
	"sync"
	"time"
)

type Cache interface {
	Get(key string) (any, bool)
	Set(key string, value any, ttl time.Duration)
}

type cachedValue struct {
	value      any
	insertedAt time.Time
	ttl        time.Duration
}

type inMemoryCache struct {
	cache map[string]*cachedValue
	sync.Mutex
}

func NewInMemoryCache() *inMemoryCache {
	return &inMemoryCache{
		cache: map[string]*cachedValue{},
	}
}

func (c *inMemoryCache) Get(key string) (any, bool) {
	c.Lock()
	defer c.Unlock()

	cachedValue, found := c.cache[key]
	if !found {
		return nil, false
	}

	// is expired
	if cachedValue.insertedAt.Add(cachedValue.ttl).Before(time.Now()) {
		delete(c.cache, key)
		return nil, false
	}

	return cachedValue.value, found
}

func (c *inMemoryCache) Set(key string, value any, ttl time.Duration) {
	c.Lock()
	defer c.Unlock()

	c.cache[key] = &cachedValue{
		value:      value,
		insertedAt: time.Now(),
		ttl:        ttl,
	}
}
