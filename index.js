const boom = require('@hapi/boom');
const express = require('express');
const bodyParser = require('body-parser');
const peopleController = require('./controllers/peopleController');

const app = express();

app.use(bodyParser.json());

app.use('/people', peopleController);

app.use((err, _, res, _next) => {
  if (boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }

  return res.status(500).json({ message: 'Internal error' });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });