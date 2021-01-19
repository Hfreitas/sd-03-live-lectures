from node import Node


class LinkedListGuard:

    def __init__(self):
        self.head = Node("HEAD")
        self.tail = self.head
        self.__length = 0

    def __str__(self):
        return f"LinkedList(len={self.__length}, value={self.head})"

    def __len__(self):
        return self.__length

    def is_empty(self):
        return not self.__length

    def insert_first(self, value):
        first_value = Node(value)
        first_value.next = self.head.next
        if self.head.next is None:
            self.tail = first_value
        self.head.next = first_value
        self.__length += 1

    def insert_last(self, value):
        new_last_value = Node(value)
        self.tail.next = new_last_value
        self.tail = self.tail.next
        self.__length += 1

if __name__ == "__main__":
    lecture_list = LinkedListGuard()
    lecture_list.insert_last(2)
    lecture_list.insert_last(1)
    lecture_list.insert_last(3)
    lecture_list.insert_first(0)
    print(lecture_list)
