const Joi = require('joi');
const { Router } = require('express');
const rescue = require('express-rescue');

const { Book } = require('../models');
const validate = require('../middlewares/validate');

const books = Router();

const validateBookSchema = validate(
  Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    pageQuantity: Joi.number().min(1),
  })
);

books.get(
  '/',

  rescue(async (_req, res) => {
    await Book.findAll().then((result) => res.status(200).json(result));
  })
);

books.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  })
);

books.post(
  '/',
  validateBookSchema,
  rescue(async (req, res) => {
    const { title, author, pageQuantity } = req.body;

    const newBook = await Book.create({ title, author, pageQuantity });

    res.status(201).json(newBook);
  })
);

books.put(
  '/:id',
  validateBookSchema,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { title, author, pageQuantity } = req.body;

    await Book.update({ title, author, pageQuantity }, { where: { id } });

    const newBook = await Book.findByPk(id);

    res.status(200).json(newBook);
  })
);

books.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    await Book.destroy({ where: { id } });

    res.status(204).end();
  })
);

module.exports = books;
