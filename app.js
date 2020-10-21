const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');
const errorMiddleware = require('./middlewares/error');

const { getRecipeService } = require('./services/recipeService');
const { getRecipeController } = require('./controllers/recipeController');

const { getUserService } = require('./services/userService');
const { getUserController } = require('./controllers/userController');

const factory = async (config) => {
  const app = express();
  app.use(bodyParser.json());

  app.get('/ping', (_, res) => res.status(200).json({ message: 'ok' }));

  const userService = getUserService(models);
  const userController = getUserController(userService);

  app.post('/users', userController.createUser);

  const recipeService = getRecipeService(models);
  const recipeController = getRecipeController(recipeService);

  app.post('/recipes', recipeController.createRecipe);
  app.get('/recipes', recipeController.getAllRecipes);
  app.get('/recipes/:id', recipeController.getRecipeById);

  app.use(errorMiddleware(config.environment));

  return app;
};

module.exports = { factory };
