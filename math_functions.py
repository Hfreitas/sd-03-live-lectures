def sum(a, b):
    return a + b


def sub(a, b):
    return a - b


def pot(a, b):
    return a ** b


NUM_A = 2
NUM_B = 3

print(__name__)
if __name__ == "__main__":
    print(
        f"Soma: {sum(NUM_A, NUM_B)} | "
        f"Subtração: {sub(NUM_A, NUM_B)} | "
        f"Potenciação: {pot(NUM_A, NUM_B)}"
    )
