from collections.abc import Iterator, Iterable


class Carta:
    def __init__(self, valor, naipe):
        self.valor = valor
        self.naipe = naipe

    def __repr__(self):
        return f'Carta({self.valor}, {self.naipe})'

class Baralho(Iterable):
    naipes = 'copas ouros espadas paus'.split()
    valores = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split()

    def __init__(self):
        self._cartas = [
            Carta(valor, naipe)
            for naipe in self.naipes
            for valor in self.valores
        ]

    def __len__(self):
        return len(self._cartas)
    
    def __iter__(self):
        return IteradorDoBaralho(self)
    

class IteradorDoBaralho(Iterator):
    
    def __init__(self, baralho):
        self.__index = 0
        self.__baralho = baralho
    
    def __next__(self):
        try:
            carta = self.__baralho._cartas[self.__index]
        except IndexError:
            raise StopIteration
        else:
            self.__index += 1
            return carta