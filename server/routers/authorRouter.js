const { Router } = require('express');

const authorController = require('../controllers/authorController');

const authors = Router();

authors.get('/', authorController.getAllAuthors);
authors.post('/', authorController.createAuthor);

module.exports = authors;
