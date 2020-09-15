const express = require('express');

const app = express();

// 39502
const PORT = process.env.PORT || 3000;
const SERVER_ENV = process.env.SERVER_ENV || 'deu ruim :/';

app.get('/', (_, res) => {
  res.send(`Você está navegando no ambiente de ${SERVER_ENV}`);
});

app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });