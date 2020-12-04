from statistics import median, mode


class Estatistica:
    @classmethod
    def media(cls, numbers):
        # soma = 0
        # for number in numbers:
        #    soma += number
        return sum(numbers) / len(numbers)

    @classmethod
    def mediana(cls, numbers):
        return median(numbers)

    @classmethod
    def moda(cls, numbers):
        return mode(numbers)
