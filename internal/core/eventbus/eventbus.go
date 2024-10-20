package eventbus

// Largely stolen from https://github.com/ThreeDotsLabs/watermill/blob/master/pubsub/gochannel/pubsub.go
// and simplified to my use case.

import (
	"context"
	"errors"
	"sync"
)

type Message struct {
	Data any
}

type EventBus interface {
	Publish(topic string, messages ...Message) error
	Subscribe(topic string) (<-chan Message, error)
}

type inMemoryEventBus struct {
	subscribersWg          sync.WaitGroup
	subscribers            map[string][]*subscriber
	subscribersLock        sync.RWMutex
	subscribersByTopicLock sync.Map // map of *sync.Mutex

	closed     bool
	closedLock sync.Mutex
	closing    chan struct{}
}

func NewInMemoryEventBus() *inMemoryEventBus {
	return &inMemoryEventBus{
		subscribers:            make(map[string][]*subscriber),
		subscribersByTopicLock: sync.Map{},

		closing: make(chan struct{}),
	}
}

func (g *inMemoryEventBus) Publish(topic string, messages ...Message) error {
	if g.isClosed() {
		return errors.New("Pub/Sub closed")
	}

	g.subscribersLock.RLock()
	defer g.subscribersLock.RUnlock()

	subLock, _ := g.subscribersByTopicLock.LoadOrStore(topic, &sync.Mutex{})
	subLock.(*sync.Mutex).Lock()
	defer subLock.(*sync.Mutex).Unlock()

	for i := range messages {
		msg := messages[i]

		err := g.sendMessage(topic, msg)
		if err != nil {
			return err
		}

	}

	return nil
}

func (g *inMemoryEventBus) sendMessage(topic string, message Message) error {
	subscribers := g.topicSubscribers(topic)

	if len(subscribers) == 0 {
		return nil
	}

	go func(subscribers []*subscriber) {
		wg := &sync.WaitGroup{}

		for i := range subscribers {
			subscriber := subscribers[i]

			wg.Add(1)
			go func() {
				subscriber.sendMessageToSubscriber(message)
				wg.Done()
			}()
		}

		wg.Wait()
	}(subscribers)

	return nil
}

func (g *inMemoryEventBus) Subscribe(topic string) (<-chan Message, error) {
	g.closedLock.Lock()

	if g.closed {
		g.closedLock.Unlock()
		return nil, errors.New("Pub/Sub closed")
	}

	g.subscribersWg.Add(1)
	g.closedLock.Unlock()

	g.subscribersLock.Lock()

	subLock, _ := g.subscribersByTopicLock.LoadOrStore(topic, &sync.Mutex{})
	subLock.(*sync.Mutex).Lock()

	s := &subscriber{
		outputChannel: make(chan Message),
		closing:       make(chan struct{}),
	}

	go func(s *subscriber, g *inMemoryEventBus) {
		select {
		case <-g.closing:
			// unblock
		}

		s.Close()

		g.subscribersLock.Lock()
		defer g.subscribersLock.Unlock()

		subLock, _ := g.subscribersByTopicLock.Load(topic)
		subLock.(*sync.Mutex).Lock()
		defer subLock.(*sync.Mutex).Unlock()

		g.removeSubscriber(topic, s)
		g.subscribersWg.Done()
	}(s, g)

	defer g.subscribersLock.Unlock()
	defer subLock.(*sync.Mutex).Unlock()

	g.addSubscriber(topic, s)

	return s.outputChannel, nil
}

func (g *inMemoryEventBus) addSubscriber(topic string, s *subscriber) {
	if _, ok := g.subscribers[topic]; !ok {
		g.subscribers[topic] = make([]*subscriber, 0)
	}
	g.subscribers[topic] = append(g.subscribers[topic], s)
}

func (g *inMemoryEventBus) removeSubscriber(topic string, toRemove *subscriber) {
	removed := false
	for i, sub := range g.subscribers[topic] {
		if sub == toRemove {
			g.subscribers[topic] = append(g.subscribers[topic][:i], g.subscribers[topic][i+1:]...)
			removed = true
			break
		}
	}
	if !removed {
		panic("cannot remove subscriber, not found ")
	}
}

func (g *inMemoryEventBus) topicSubscribers(topic string) []*subscriber {
	subscribers, ok := g.subscribers[topic]
	if !ok {
		return nil
	}

	// let's do a copy to avoid race conditions and deadlocks due to lock
	subscribersCopy := make([]*subscriber, len(subscribers))
	copy(subscribersCopy, subscribers)

	return subscribersCopy
}

func (g *inMemoryEventBus) isClosed() bool {
	g.closedLock.Lock()
	defer g.closedLock.Unlock()

	return g.closed
}

func (g *inMemoryEventBus) Close() error {
	g.closedLock.Lock()
	defer g.closedLock.Unlock()

	if g.closed {
		return nil
	}

	g.closed = true
	close(g.closing)

	g.subscribersWg.Wait()

	return nil
}

type subscriber struct {
	ctx context.Context

	sending       sync.Mutex
	outputChannel chan Message

	closed  bool
	closing chan struct{}
}

func (s *subscriber) Close() {
	if s.closed {
		return
	}
	close(s.closing)

	// ensuring that we are not sending to closed channel
	s.sending.Lock()
	defer s.sending.Unlock()

	s.closed = true

	close(s.outputChannel)
}

func (s *subscriber) sendMessageToSubscriber(msg Message) {
	s.sending.Lock()
	defer s.sending.Unlock()

	if s.closed {
		return
	}

	select {
	case s.outputChannel <- msg:
		return
	case <-s.closing:
		return
	}
}
