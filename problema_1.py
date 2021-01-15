"""
O exercício consiste em criar uma função chamada is_valid() que receberá
um argumento contendo
uma string com os caracteres (, ), [, ], { e }. A função deve verificar se os
"parênteses",
 são válidos seguindo as regras:

Os caracteres de abertura devem possuir os caracteres de fechamento
correspondentes;

Os caracteres de abertura devem ser fechados na ordem correta;

"""
from stack import Stack


def is_valid(string):
    stack = Stack()
    """Verifica se a string passada como parâmetro é divisível por 2.
    Caso não seja, ela não esta balanceada, ou seja, não possui a
    quantidade adequada de abre e fecha parênteses, por exemplo."""
    if len(string) % 2 != 0:
        return False

    for char in string:
        if char not in ['(', '[', '{', ')', ']', '}']:
            return False

        """O primeiro processamento a ser feito é verificar se o carácter é
        algum dos caracteres de abertura."""
        if char in ['(', '[', '{']:
            # Caso seja adicione-o na pilha
            stack.push(char)
        elif char == ')' and not stack.is_empty() and stack.peek() == '(':
            stack.pop()
        elif char == ']' and not stack.is_empty() and stack.peek() == '[':
            stack.pop()
        elif char == '}' and not stack.is_empty() and stack.peek() == '{':
            stack.pop()

    return stack.is_empty()


print(is_valid('()'))  # True
print(is_valid('{)'))  # False
print(is_valid('()[]{}'))  # True
print(is_valid('(]'))  # False
print(is_valid('([)]'))  # False
print(is_valid('{[]}'))  # True
print(is_valid('{{}[][[[]]]}'))  # True
print(is_valid('{{({})}}'))  # True
print(is_valid('[[[]]]'))  # True
print(is_valid('())'))  # False
