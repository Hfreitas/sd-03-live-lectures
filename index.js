const express = require('express');
const app = express();

const color = require('random-hex-color')();

app.get('/', (_, res) => {
  res.type('text/html').send(
    `<body style="background-color: ${color}">
      <h1>Aplicação rodando no processo: ${process.pid}!</h1>
    </body>`
  );
});

app.get('/bug', (_, res) => {
  res.send('Um bug ocorreu! :O');

  process.exit(1);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });