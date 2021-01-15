"""
Na mesma escola do problema anterior, a criança "d" recebeu uma notícia ótima
e gostaria de compartilhar com seus amigos. Contudo, a criança "d" não quer que
essa notícia chegue a todos os estudantes da escola.

A criança "d" sabe que as notícias são passadas apenas entre amigos.
Portanto, "d" quer saber quem são os amigos de todas as crianças da escola.
"""


def list_friends(friends):
    person_to_friends = {}

    for a, b in friends:
        if a not in person_to_friends:
            person_to_friends[a] = set()

        if b not in person_to_friends:
            person_to_friends[b] = set()

        person_to_friends[a].add(b)
        person_to_friends[b].add(a)

    return person_to_friends


if __name__ == "__main__":
    friends = [
        ("d", "a"),
        ("f", "z"),
        ("g", "i"),
        ("f", "r"),
        ("a", "f"),
        ("r", "l"),
        ("g", "h"),
        ("e", "h"),
        ("h", "d"),
        ("z", "g"),
        ("f", "g"),
    ]

    print(list_friends(friends))
