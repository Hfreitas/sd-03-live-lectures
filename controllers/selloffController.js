const { resolveSoa } = require('dns');
const express = require('express');
const { Op } = require('sequelize');
const { Selloff, Product } = require('../models');

const selloffs = express.Router();

selloffs.post('/', (req, res) => {
  const { name, discount, startDate, endDate } = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);

  Selloff.create({ name, discount, startDate: start, endDate: end })
    .then((newSelloff) => {
      res.status(200).json(newSelloff);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

selloffs.get('/', (req, res, next) => {
  Selloff.findAll()
    .then((selloffs) => {
      res.status(200).json(selloffs);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

selloffs.get('/:id', (req, res, next) => {
  Selloff.findByPk(req.params.id, { include: { model: Product, as: 'products', through: { attributes: [] } } })
    .then((selloff) => {
      if (selloff === null) {
        return res.status(404).send({ message: 'Liquidação não encontrada' });
      }

      return res.status(200).json(selloff);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

selloffs.delete('/:id', (req, res) => {
  Selloff.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((selloffs) => {
      res.status(200).send({ message: 'Liquidação excluída com sucesso.' });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

selloffs.put('/:id', (req, res) => {
  const { name, discount, startDate, endDate } = req.body;

  Selloff.update(
    { name, discount, startDate, endDate },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((selloffs) => {
      res.status(200).send({ message: 'Liquidação atualizada com sucesso.' });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

selloffs.post('/:id/products', async (req, res) => {
  try {
    const { productIds } = req.body;

    const selloff = await Selloff.findByPk(req.params.id);

    if (!selloff) return res.status(404).json({ message: 'Liquidação não encontrada' });

    const products = await Product.findAll({
      where: { id: { [Op.in]: productIds } }
    });

    await selloff.addProducts(products);

    res.status(201).json({ message: 'Produtos adicionados com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = selloffs;