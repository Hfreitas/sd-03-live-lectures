const mongodb = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');
const services = require('./services');
const controllers = require('./controllers');

async function start() {
  const app = express();
  app.use(bodyParser.json());

  const dbConnection = await mongodb
    .connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db('workersApp'));

  const modelInstances = models.factory(dbConnection);
  const serviceInstances = services.factory(modelInstances);
  const controllerInstances = controllers.factory(serviceInstances);

  app.use('/workers', controllerInstances.workers);

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: true, message: err.message });
  });

  return app;
}

start()
  .then((app) => {
    app.listen(3000, () => {
      console.log('Ouvindo na porta 3000');
    });
  })
  .catch(console.error);
