"""
Dada uma lista de números, retorne o número mais frequente.

test1 = [0, 0, -1, 3, 5, 1, 1, 5, 2, 0, 8, 1, -2, 0, 1]
# saída: 0

test2 = []
# saída: None

test3 = [1, 2, 3]
# saída: 1
# Explicação: mesmo caso de empate

test4 = [5, 5, 5, 2, 2, 3, 3, 3, 3, 10, 10, 10, 10, 10, 10]
# saída: 10

# Algoritmo do Luís
# se lista vazia retorna None
# ordenação n log n
# percorro n 2 variaveis controle de aparição

# Algoritmo Gustavo
# se lista vazia retorna None
# atravessa a lista adicionando a contagem (quando não encontra adiciona com valor 1)
# atravessa o dicionário e procuro o maior

"""


def most_frequent(nums):
    if len(nums) == 0:
        return None

    most_frequent_num = nums[0]
    frequency = {}
    for num in nums:
        if num not in frequency:
            frequency[num] = 1
        else:
            frequency[num] += 1

        if frequency[num] > frequency[most_frequent_num]:
            most_frequent_num = num

    return most_frequent_num


if __name__ == "__main__":
    test1 = [0, 0, -1, 3, 5, 1, 1, 5, 2, 0, 8, 1, -2, 0, 1]
    test2 = []
    test3 = [1, 2, 3]
    test4 = [5, 5, 5, 2, 2, 3, 3, 3, 3, 10, 10, 10, 10, 10, 10]
    print(most_frequent(test1))
    print(most_frequent(test2))
    print(most_frequent(test3))
    print(most_frequent(test4))