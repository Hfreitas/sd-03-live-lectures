const rescue = require('express-rescue');

const createUser = (service) =>
  rescue(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await service.createUser(name, email, password);

    res.status(201).json(user);
  });

const getUserController = (service) => ({
  createUser: createUser(service),
});

module.exports = { getUserController };
