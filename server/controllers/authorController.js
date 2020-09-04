const rescue = require('express-rescue');
const authorService = require('../services/authorService');

const getAllAuthors = rescue(async (req, res) => {
  const authors = await authorService.getAll();

  res.status(200).json(authors);
});

const createAuthor = rescue(async (req, res) => {
  const { name, email } = req.body;

  const newAuthor = await authorService.create(name, email);

  if (newAuthor.error) {
    return res.status(422).json({ message: newAuthor.message });
  }

  return res.status(201).json(newAuthor);
});

module.exports = {
  getAllAuthors,
  createAuthor
};