const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const notificationController = require('./controllers/notificationController');

const app = express();

const PUBLIC_PATH = path.join(__dirname, 'public');

module.exports = (io) => {
  app.use(bodyParser.json());

  app.use('/client', express.static(PUBLIC_PATH, { extensions: ['html'] }));
  app.post('/notification', notificationController.sendNotification(io));

  return app;
};
