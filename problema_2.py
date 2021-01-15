"""
Pedro é zelador de uma escola primária e todos os dias ele recebe as crianças
no portão.
Amanhã é dia de "Cosme e Damião" e ele quer dar um saquinho de doces
para cada um.
Ele não sabe quantas crianças estudam na escola, mas sabe quem
é amigo de quem.
Ajude Pedro a descobrir quantos saquinhos de doce ele precisa preparar.
"""


def num_children(friends):
    unique_children = set()

    for a, b in friends:
        unique_children.add(a)
        unique_children.add(b)
    return len(unique_children)


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

    print(num_children(friends))