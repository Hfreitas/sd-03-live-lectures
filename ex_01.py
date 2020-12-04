class TV:
    def __init__(self, tamanho):
        self.__volume = 50
        self.__canal = 1
        self.__tamanho = tamanho
        self.__ligada = False

    def aumentar_volume(self):
        if self.__volume <= 99:
            self.__volume += 1

    def diminuir_volume(self):
        if 0 < self.__volume:
            self.__volume -= 1

    def modificar_canal(self, novo_canal):
        if novo_canal < 1 or novo_canal > 99:
            raise ValueError("Canal Indisónível")
        self.__canal = novo_canal

    def ligar_desligar(self):
        self.__ligada = not self.__ligada
