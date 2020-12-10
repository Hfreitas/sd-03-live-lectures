"""
Em softwares científicos, existe uma função bastante útil chamada reshape
que é capaz de remodelar a matriz em uma nova com tamanho diferente,
porém mantendo os dados originais. Se algum erro ocorrer na remodelagem,
a matriz original deve ser retornada.
"""


def matrix_reshape(matrix, rows, columns):
    is_impossible_reshape = (
        not matrix or
        rows * columns != len(matrix) * len(matrix[0])
    )
    if is_impossible_reshape:
        return matrix
    new_matrix = [[]]
    row_index = 0
    column_index = 0
    for row in matrix:
        for column in row:
            if column_index >= columns:
                new_matrix.append([])  # nova linha
                row_index += 1
                column_index = 0
            new_matrix[row_index].append(column)
            column_index += 1
    return new_matrix


test1 = [[1, 2],
         [3, 4]]  # formatação apenas para ajudar a visualização
rows_1 = 1
columns_1 = 4

# saída: [[1, 2, 3, 4]]
print(matrix_reshape(test1, rows_1, columns_1))

test2 = [[1, 2],
         [3, 4]]
rows_2 = 2
columns_2 = 4

# saída: matriz original pois, 2 * 4 (novos valores de linha e coluna)
# diferente de 2 * 2(linhas e colunas originais)
print(matrix_reshape(test2, rows_2, columns_2))

test3 = []
rows_3 = 2
columns_3 = 2

# saída: []
print(matrix_reshape(test3, rows_3, columns_3))