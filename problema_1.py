"""
Na vendinha "Horta Farta", a pessoa responsável pelo estoque todos os 
dias verifica quais itens estão na prateleira 
e registra no sistema. A nossa tarefa hoje é implementar, no sistema da vendinha, 
uma função que leia o input de quantos itens estão na prateleira, todos os dias, 
e retorne a lista de itens esgotados.

Ponto importante para ser levado em consideração ao resolver o problema: 
a vendinha vende um total de 20 itens. Ou seja, se na prateleira tem apenas 15 itens,
significa que 5 produtos esgotaram.
"""


def to_buy(shelf):
    unique_at_shelf = set(shelf)
    all_itens = set(range(1, 21))
    return all_itens.difference(unique_at_shelf)


if __name__ == "__main__":
    shelf = [4, 1, 1, 13, 6, 3, 1, 7, 14, 20, 13, 9]
    print(to_buy(shelf))