const rescue = require('express-rescue');

const createRecipe = (service) =>
  rescue(async (req, res) => {
    const { title, preparation, userId } = req.body;

    const recipe = await service.createRecipe(title, preparation, userId);

    res.status(201).json(recipe);
  });

const getRecipeById = (service) =>
  rescue(async (req, res) => {
    const { id } = req.params;
    const { includeUser } = req.query;

    const recipe = await service.getRecipeById(id, includeUser);

    return res.status(200).json(recipe);
  });

const getAllRecipes = (service) =>
  rescue(async (req, res) => {
    const recipes = await service.getAllRecipes();
    return res.status(200).json(recipes);
  });

const getRecipeController = (service) => ({
  getRecipeById: getRecipeById(service),
  getAllRecipes: getAllRecipes(service),
  createRecipe: createRecipe(service),
});

module.exports = { getRecipeController };
