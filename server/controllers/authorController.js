const boom = require('@hapi/boom');
const rescue = require('express-rescue');

const authorModel = require('../models/authorModel');

const getAllAuthors = rescue(async (_, res) => {
  const authors = await authorModel.getAll();

  res.render('authors/list', { authors });
});

const getAuthorById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const author = await authorModel.getById(id);

  if (!author) {
    return next(boom.notFound('Author não encontrado'));
  }

  return res.render('authors/details', { author });
});

const createAuthor = rescue(async (req, res, next) => {
  const { name, email } = req.body;

  const createdAuthor = await authorModel.insert(name, email);

  if (createdAuthor.error) {
    return res.render('authors/create', { message: createAuthor.message });
  }

  res.redirect(`/authors/${createdAuthor.id}`);
});

const createAuthorView = rescue(async (_, res) => {
  res.render('authors/create', { message: null });
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  createAuthorView
};