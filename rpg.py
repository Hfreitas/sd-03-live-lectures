class Character:

    roles = ["mago", "ladino", "guerreiro"]

    def __init__(self, name, role, attack, dice, level=1):
        self.name = name
        self.role = role
        self.attack = attack
        self.dice = dice
        self.__level = level
        self.__xp = 0
        self.__hp = 30

    def hello(self):
        return f"Olá, Meu nome é {self.name} e eu sou {self.role} e tenho nível {self.__level}"

    def add_xp(self, xp):
        self.__xp += xp
        if self.__xp >= 10:
            self.__level += 1
            self.__xp = 0

    def roll_perception(self):
        return 5

    def receive_damage(self, damage):
        self.__hp -= damage

    def hp(self):
        return self.__hp


class Cliff:
    @classmethod
    def fall(cls, char):
        result = char.roll_perception()
        if result >= 10:
            return
        char.receive_damage(3)
