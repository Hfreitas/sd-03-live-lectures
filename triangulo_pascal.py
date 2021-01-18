"""
Em matemática, o triângulo de Pascal é uma matriz triangular dos coeficientes binomiais. Este problema é um clássico da Ciência da Computação e consiste em que cada número é a soma dos dois números diretamente acima dele.

As linhas do triângulo de Pascal são convencionalmente enumeradas começando com a linha n = 0 no topo (a 0ª linha). As entradas em cada linha são numeradas da esquerda, começando com k = 0 e geralmente são escalonadas em relação aos números nas linhas adjacentes.
"""
from deque_aula import Deque


def row_pascal_triangle(row_index):
    """O topo do triangulo é formado pelo valor inicial condicionado a `1`, ou seja, a primeira 
    linha deverá ser formada por um deque de apenas 1 elemento"""
    row_triangle = Deque()
    row_triangle.push_back(1)

    """Não utilizamos o índice da iteração, pois ele não faz sentido pra esse contexto,
    utilizamos o laço de repetição apenas para refazer as próximas operações N vezes."""
    for _ in range(0, row_index):
        """Neste momento iremos reutilizar a linha já criada como um registro temporário
        para efetuar as próximas operações"""
        """Criamos a nova linha current_row, que será preenchida com os valores correspondentes,
        mas antes disso, criamos guardiões no deque anterior para evitar acesso a posições indevidas da estrutura.
        Desta forma a linha top anteriormente, Deque(1), passa a ser Deque(0, 1, 0)."""
        current_row = Deque()
        row_triangle.push_front(0)
        row_triangle.push_back(0)

        """Fazemos um laço para que essa operação seja feita enquanto existir
        elementos na linha anterior `while len(row_triangle) > 1:`"""
        while len(row_triangle) > 1:
            current_row.push_back(row_triangle.pop_front() + row_triangle.peek_front())

        """Ao finalizar a construção da nova linha, será necessário indicar que 
        esta linha já está pronta e preparada para gerar a linha seguinte"""
        row_triangle = current_row

    """Ao atingir o limite `row_index` a linha atual deverá ser retornada"""
    return row_triangle




if __name__ == "__main__":
    print(row_pascal_triangle(0))  # saida: Deque(1)
    print(row_pascal_triangle(1))  # saída: Deque(1, 1)
    print(row_pascal_triangle(2))  # saída: Deque(1, 2, 1)
    # print(row_pascal_triangle(num)) # saída: Deque(1, 4, 6, 4, 1)