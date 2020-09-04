const authorModel = require('../models/authorModel');

const getAll = async () => authorModel.getAll();

const create = async (name, email) => {
  if (!name || !email) {
    return {
      error: true,
      message: 'Invalid name or email'
    };
  }

  return authorModel.create(name, email);
};

module.exports = {
  getAll,
  create
};