const express = require('express');

const app = express();

app.get('/', (_, res) => {
  res.send('Hello, world!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Escutando na porta ${port}`); });