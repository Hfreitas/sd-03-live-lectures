"""
A cantina da sua escola está ficando um caos com as filas.
 Um dia resolveram distribuir senhas. Ocorre que perderam o
 controle de quais senhas já tinham distribuído.
A única informação que a cantina tem agora é qual pessoa vem imediatamente
após uma outra. Seu trabalho é remontar completamente a fila a partir
dessas informações.

orders = [
    ("fernanda", "rafa"),
    ("fran", "daniel"),
    ("mirian", "gabriel"),
    ("matheus", "yasmin"),
    ("giovanni", "fernanda"),
    ("rafa", "fran"),
    ("daniel", "mirian"),
    ("gabriel", "matheus"),
]

saída: [
    "giovanni",
    "fernanda",
    "rafa",
    "fran",
    "daniel",
    "mirian",
    "gabriel",
    "matheus",
    "yasmin",
]
"""


def get_order(orders):
    if len(orders) == 0:
        return []

    # Montar a hash
    orders_hash = {}
    left = []
    right = []
    for person1, person2 in orders:
        orders_hash[person1] = person2

        # Se a pessoa1 apareceu na direita, ela não é a primeira
        if person1 in right:
            right.remove(person1)
        else:
            left.append(person1)

        # Se a pessoa2 apareceu na esquerda, ela não é a última
        if person2 in left:
            left.remove(person2)
        else:
            right.append(person2)

    # A pessoa que sobrou do lado esquerdo é a primeira da fila
    answer = [left[0]]
    # Para executarmos a lógica abaixo vamos começar com a primeira pessoa da fila
    person = left[0]
    while person in orders_hash:
        answer.append(orders_hash[person])
        person = orders_hash[person]
    return answer


if __name__ == "__main__":
    orders = [
        ("fernanda", "rafa"),
        ("fran", "daniel"),
        ("mirian", "gabriel"),
        ("matheus", "yasmin"),
        ("giovanni", "fernanda"),
        ("rafa", "fran"),
        ("daniel", "mirian"),
        ("gabriel", "matheus"),
    ]
    print(get_order(orders))
