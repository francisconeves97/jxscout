package concurrentqueue

import (
	"context"
	"sync"
)

type Queue[T any] interface {
	Produce(ctx context.Context, msg T)
	StartConsumers(process func(ctx context.Context, msg T))
}

type queue[T any] struct {
	messages       chan item[T]
	wg             sync.WaitGroup
	maxConcurrency int
}

type item[T any] struct {
	msg T
	ctx context.Context
}

func NewQueue[T any](maxConcurrency int) Queue[T] {
	if maxConcurrency <= 0 {
		maxConcurrency = 1
	}
	return &queue[T]{
		messages:       make(chan item[T]),
		maxConcurrency: maxConcurrency,
	}
}

func (q *queue[T]) Produce(ctx context.Context, msg T) {
	go func() {
		q.messages <- item[T]{msg: msg, ctx: ctx}
	}()
}

func (q *queue[T]) StartConsumers(process func(ctx context.Context, msg T)) {
	for i := 0; i < q.maxConcurrency; i++ {
		q.wg.Add(1)
		go func() {
			defer q.wg.Done()
			for item := range q.messages {
				process(item.ctx, item.msg)
			}
		}()
	}
}
