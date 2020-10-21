module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    preparation: DataTypes.STRING,
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return Recipe;
};
