const express = require('express');

const errorMiddleware = require('./middlewares/error');
const createConnection = require('./models/connection');
const cepController = require('./controllers/cepController');

async function factory(config) {
  const app = express();

  const db = await createConnection(config.mongodb.uri);

  app.get('/', cepController.lookupCEP(db));

  app.use(errorMiddleware(config.environment));

  return app;
}

module.exports = {
  factory,
};
