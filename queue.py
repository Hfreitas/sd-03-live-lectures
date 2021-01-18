from deque_aula import Deque


class Queue:
    def __init__(self):
        self._deque = Deque()

    def enqueue(self, value):
        self._deque.push_back(value)

    def dequeue(self):
        return self._deque.pop_front()

    def peek(self):
        return self._deque.peek_front()

    def clear(self):
        self._deque.clear()

    def __len__(self):
        return len(self._deque)
