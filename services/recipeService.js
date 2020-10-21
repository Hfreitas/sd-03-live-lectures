const createRecipe = (models) => (title, preparation, userId) =>
  models.Recipe.create({ title, preparation, userId });

const getRecipeById = (models) => async (recipeId, includeUser = false) => {
  const recipe = await models.Recipe.findByPk(recipeId);

  if (!includeUser) return recipe;

  return {
    ...recipe._dataValues,
    user: await recipe.getUser({ attributes: { exclude: ['password'] } }),
  };
};

const getAllRecipes = (models) => async () =>
  models.Recipe.findAll({
    include: {
      model: models.User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
  });

const getRecipeService = (models) => ({
  getRecipeById: getRecipeById(models),
  getAllRecipes: getAllRecipes(models),
  createRecipe: createRecipe(models),
});

module.exports = {
  getRecipeService,
};
