from linked_list import LinkedList


def mid_element(linked_list):
    if linked_list.is_empty():
        return None
    middle_index = len(linked_list) // 2
    return linked_list.get_element_at(middle_index)


if __name__ == "__main__":
    lecture_list = LinkedList()
    print(mid_element(lecture_list))    # saída: None

    # Lista ligada atual = [1]
    lecture_list.insert_last(1)
    print(mid_element(lecture_list))    # saída: Node(value=1 next=None)

    # Lista ligada atual = [1, 2, 3]:
    # LinkedList(len=3 value=Node(value=1 next=Node(value=2 next=Node(value=3 next=None))))
    print(lecture_list)
    lecture_list.insert_last(2)
    lecture_list.insert_last(3)
    print(mid_element(lecture_list))    # saída: Node(value=2 next=None)

    # Lista ligada atual = [1, 2, 3, 4]
    lecture_list.insert_last(4)
    print(mid_element(lecture_list))    # saída: Node(value=3 next=None)