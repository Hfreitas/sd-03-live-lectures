const { Router } = require('express');

const authorController = require('../controllers/authorController');

const authors = Router();

authors.get('/', authorController.getAllAuthors);
authors.get('/create', authorController.createAuthorView);
authors.get('/:id', authorController.getAuthorById);

authors.post('/create', authorController.createAuthor);

module.exports = authors;
