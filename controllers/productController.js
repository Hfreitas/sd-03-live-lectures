const { Router } = require('express');
const rescue = require('express-rescue');

const { Product, User } = require('../models');

const products = Router();

products.post('/', rescue((req, res) => {
  const { name, description, price, userId } = req.body;

  Product.create({ name, description, price, userId })
    .then(newProduct => res.status(201).json(newProduct));
}));

products.get('/', rescue((req, res) => {
  Product.findAll().then(results => res.status(200).json(results));
}));

products.get('/:id', rescue((req, res) => {
  Product.findByPk(req.params.id, {
    attributes: { exclude: ['userId'] },
    include: {
      model: User, as: 'user',
      attributes: { exclude: ['password'] }
    }
  })
    .then(product => {
      if (!product) return res.status(404).json({ ok: false, message: 'Product not found' });

      res.status(200).json(product);
    });
}));

products.delete('/:id', rescue((req, res) => {
  Product.destroy({ where: { id: req.params.id } })
    .then(() => res.status(204).end());
}));

products.put('/:id', rescue((req, res) => {
  const { name, description, price, userId } = req.body;

  Product.update({ name, description, price, userId }, { where: { id: req.params.id } })
    .then(() => Product.findByPk(req.params.id))
    .then(product => res.status(200).json(product));
}));

module.exports = products;