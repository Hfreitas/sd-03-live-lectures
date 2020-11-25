def rainha_sob_ataque(nova_rainha, rainhas_do_tabuleiro):
    if not len(rainhas_do_tabuleiro):
        return False
    for rainha_do_tabuleiro in rainhas_do_tabuleiro:
        if verifica_linha_reta(
            rainha_do_tabuleiro, nova_rainha
        ) or verifica_diagonal(rainha_do_tabuleiro, nova_rainha):
            return True
    return False


def verifica_linha_reta(atacante, vitima):
    # if(atacante["linha"] == vitima["linha"]):
    # print("Atacada pela linha!")
    # if(atacante["coluna"] == vitima["coluna"]):
    # print("Atacada pela coluna!")
    return (
        atacante["linha"] == vitima["linha"] or
        atacante["coluna"] == vitima["coluna"]
    )


def verifica_diagonal_superior_direita(atacante, vitima):
    proxima_posicao = {
        "linha": atacante["linha"] - 1,
        "coluna": atacante["coluna"] + 1,
    }
    while esta_dentro_do_tabuleiro(
        proxima_posicao["linha"], proxima_posicao["coluna"]
    ):
        if (
            proxima_posicao["linha"] == vitima["linha"]
            and proxima_posicao["coluna"] == vitima["coluna"]
        ):
            return True
        proxima_posicao["linha"] -= 1
        proxima_posicao["coluna"] += 1
    return False


def verifica_diagonal_superior_esquerda(atacante, vitima):
    proxima_posicao = {
        "linha": atacante["linha"] - 1,
        "coluna": atacante["coluna"] - 1,
    }
    while esta_dentro_do_tabuleiro(
        proxima_posicao["linha"], proxima_posicao["coluna"]
    ):
        if (
            proxima_posicao["linha"] == vitima["linha"]
            and proxima_posicao["coluna"] == vitima["coluna"]
        ):
            return True
        proxima_posicao["linha"] -= 1
        proxima_posicao["coluna"] -= 1
    return False


def verifica_diagonal_inferior_esquerda(atacante, vitima):
    proxima_posicao = {
        "linha": atacante["linha"] + 1,
        "coluna": atacante["coluna"] - 1,
    }
    while esta_dentro_do_tabuleiro(
        proxima_posicao["linha"], proxima_posicao["coluna"]
    ):
        if (
            proxima_posicao["linha"] == vitima["linha"]
            and proxima_posicao["coluna"] == vitima["coluna"]
        ):
            return True
        proxima_posicao["linha"] += 1
        proxima_posicao["coluna"] -= 1
    return False


def verifica_diagonal_inferior_direita(atacante, vitima):
    proxima_posicao = {
        "linha": atacante["linha"] + 1,
        "coluna": atacante["coluna"] + 1,
    }
    while esta_dentro_do_tabuleiro(
        proxima_posicao["linha"], proxima_posicao["coluna"]
    ):
        if (
            proxima_posicao["linha"] == vitima["linha"]
            and proxima_posicao["coluna"] == vitima["coluna"]
        ):
            return True
        proxima_posicao["linha"] += 1
        proxima_posicao["coluna"] += 1
    return False


def esta_dentro_do_tabuleiro(linha, coluna):
    return 0 <= linha <= 7 and 0 <= coluna <= 7


def verifica_diagonal(atacante, vitima):
    return (
        verifica_diagonal_superior_direita(atacante, vitima)
        or verifica_diagonal_superior_esquerda(atacante, vitima)
        or verifica_diagonal_inferior_esquerda(atacante, vitima)
        or verifica_diagonal_inferior_direita(atacante, vitima)
    )


rainhas_do_tabuleiro = [
    {"linha": 0, "coluna": 3},
    {"linha": 1, "coluna": 6},
]  # atacante

nova_rainha = {"linha": 3, "coluna": 3}  # vitima

print(rainha_sob_ataque(nova_rainha, rainhas_do_tabuleiro))
