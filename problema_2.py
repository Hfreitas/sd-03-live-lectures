"""
str = ['1', '2', '+', 'D', 'C']

# Rodada 1: Foi feito 1 ponto pelo time
# Rodada 2: Foi feito 2 pontos pelo time
# Rodada 3: Foi feito o somatório entre as duas últimas rodadas, dando o valor
#  de três pontos na rodada
# Rodada 4: Foi dobrado o valor da última rodada válida. Nesse rodada foram
# feitos 6 pontos
# Rodada 5: Foi removido o valor da última rodada válida, nessa rodada o time
# perdeu os 6 pontos da última rodada
# rodadas:         1   2   3   4   5
# saída: 6 pontos (1 + 2 + 3 + 6 - 6)
"""
from stack import Stack


def calculate_points(rounds):
    if len(rounds) == 1 and rounds[0] in ['D', 'C', '+']:
        return None

    stack = Stack()
    for game_round in rounds:
        if game_round == '':
            return None

        if game_round == '+':
            """Na implementação da regra, removemos os dois últimos valores
            da pilha para podermos soma-los e descobrir o valor da rodada
            atual. Então empilhamos os valores removidos, de tal forma que
            fiquem na mesma ordem, e então nós empilhamos o valor da
            rodada atual."""
            last_round = stack.pop()
            penultimate_round = stack.pop()
            current_round = penultimate_round + last_round

            stack.push(penultimate_round)
            stack.push(last_round)
            stack.push(current_round)
        elif game_round == 'D':
            """No cálculo dessa regra, não será necessário remover o
            valor da pilha. Nós conseguimos utilizar o método `peek`
            para ler o valor da última rodada."""
            last_round = stack.peek()
            current_round = last_round * 2

            stack.push(current_round)
        elif game_round == 'C':
            """Regra para remover os pontos da última rodada"""
            stack.pop()
        else:
            """A última regra consiste em converter a string contendo
            um número em pontos para podermos somar os pontos depois de
            calcular todas as rodadas."""
            stack.push(int(game_round))

    """É necessário fazermos o somatório dos pontos para descobrir o valor total
    de pontos durante a partida. Para fazer o somatório, vamos criar uma
    variável chamada `total` e então iterar na pilha até que ela esteja
    vazia, somando o total de pontos de cada item na fila, para retornarmos
    o total de pontos. Neste ponto ela deve somente conter números."""
    total = 0
    while not stack.is_empty():
        total += stack.pop()

    return total


print(calculate_points(['1', '2', '+', 'D', 'C']))  # 6
print(calculate_points(['5', '2', 'C', 'D', '+']))  # 30
print(calculate_points(['5', '-2', '4', 'C', 'D', '9', '+', '+']))  # 27
