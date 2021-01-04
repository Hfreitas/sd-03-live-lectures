"""
Dado um array de inteiros, inverta a posição dos 
seus elementos.
- caso base
- caso recursivo
- complexidade

[] -> []
[1] -> [1]
[1, 2] -> [2, 1]
[1, 2, 3] -> [3, 2, 1]
"""


def reverse(array):
    # caso base
    if len(array) <= 1:
        return array

    return [array[-1]] + reverse(array[:len(array) - 1])


array = [1, 2, 3, 4, 5]
print(reverse(array))