"""
Dado uma lista ordenada de letras do alfabeto, contendo somente
letras minúsculas, e dado uma letra como alvo,
procure o menor elemento na lista que é maior que o alvo.
"""


def next_greatest_letter(letters, target):

    low_index = 0
    high_index = len(letters)

    while low_index < high_index:

        middle_index = (high_index + low_index) // 2

        if letters[middle_index] <= target:
            low_index = middle_index + 1
        else:
            high_index = middle_index

    return letters[low_index % len(letters)]


letras1 = ["c", "f", "j"]
alvo1 = "a"