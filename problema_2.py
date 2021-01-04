"""
Dado um número inteiro positivo decimal, converta sua base para binária.
10 / 2 = 5, resto = 0
5  / 2 = 2, resto = 1
2  / 2 = 1, resto = 0
1  / 2 = 0, resto = 1

10 = 1 0 1 0

| 128 | 64  | 32  | 16  | 8   | 4   | 2   | 1   |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 0   | 1   |  0  | 1   | 0   |

convert_to_binary(2)    # saída: 10
convert_to_binary(4)    # saída: 100
convert_to_binary(39)   # saída: 100111
convert_to_binary(128)  # saída: 10000000
"""


def convert_to_binary(number):
    value, mod = divmod(number, 2)

    if number > 1:
        convert_to_binary(value)  # pega o valor da divisão sem o resto

    print(mod, end="")  # mostra o resultado horizontalmente


decimal = 10
convert_to_binary(decimal)
