/**
 * Exercício 1: Crie uma função que retorna uma promise:
 *
 * Essa função deve receber 3 parâmetros, fazendo o tratamento de erro caso algum dos parâmetros não seja um número.
 *
 * Caso algum dos parâmetros não seja do tipo Number rejeite a promise e imprima na tela a frase "Digite apenas números".
 *
 * Caso todos os parâmetros sejam do tipo Number você deve somar os dois primeiros.
 *
 * Depois pegue o resultado da soma e multiplique pelo terceiro parâmetro e caso seja menor que 50,
 * rejeite a promise com a mensagem "Valor muito baixo".
 *
 * Caso contrário, aceite a promise imprimindo o resultado da multiplicação na tela.
 */

const useNumbers = (a, b, c) => new Promise((resolve, reject) => {
  if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
    return reject(new Error('Digite apenas números'));
  }

  const sum = a + b;

  const multiplied = sum * c;

  if (multiplied < 50) return reject(new Error('Valor muito baixo'));

  resolve(multiplied);
});

useNumbers('1', 2, 3)
  .then(result => {
    console.log(result);
    return `Resultado: ${result}`;
  })
  .catch(err => console.error(err.message))
  .then((result) => useNumbers(1, 2, 3))
  .then(console.log)
  .catch(err => console.error(err.message))
  .then(() => useNumbers(24, 26, 10))
  .then(console.log)
  .catch(err => console.error(err.message));
