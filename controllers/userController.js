
const createUser = (User) => async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!User.validateUser(username, email, password, role)) {
    return res.status(400).send({
      message: 'Dados inválidos.',
    });
  }

  db.select();

  const newUser = await User.create(username, email, password, role);
  res.status(200).send({
    message: 'Usuário criado com sucesso!',
    user: newUser
  });
};

module.exports = {
  createUser
};