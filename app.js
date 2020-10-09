const express = require('express');
const bodyParser = require('body-parser');

const bookController = require('./controllers/bookController');

const factory = () => {
  const app = express();

  app.use(bodyParser.json());

  app.use('/books', bookController);

  app.use((err, _req, res, _next) => {
    if (err.status) {
      return res.status(err.status).json({ error: { message: err.message } });
    }

    console.error(err);

    res.status(500).json({ error: { message: 'Algo deu errado' } });
  });

  return app;
};

module.exports = {
  factory,
};
