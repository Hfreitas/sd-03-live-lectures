const createUser = ({ User }) => (name, email, password) => {
  return User.create({ name, email, password });
};

const getUserService = (models) => ({
  createUser: createUser(models),
});

module.exports = { getUserService };
