const express = require('express');
const bodyParser = require('body-parser');

const UserModel = require('./models/userModel');
const userController = require('./controllers/userController');
const createDatabaseConnection = require('./connection');

async function start () {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const db = await createDatabaseConnection();
  const userModel = UserModel.factory(db);

  app.post('/users', userController.createUser(userModel));

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Ouvindo a porta ${PORT}`);
  });
}

start()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });