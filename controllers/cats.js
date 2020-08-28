const catService = require('../services/catService');
const rescue = require('express-rescue');

const listCats = async (_req, res) => {
  const cats = await catService.getAll();

  res.status(200).json(cats);
};

const newCat = rescue(async (req, res) => {
  const { cat, owner } = req.body;

  const result = await catService.add({ cat, owner });

  if (result.error) return res.status(422).json({ message: result.error.message });

  res.status(201).end();
});

const catDetails = async (req, res) => {
  const { id } = req.params;

  const cat = await catService.getById(id);

  if (!cat) return res.status(404).json({ message: 'Cat not found' });

  res.status(200).json(cat);
};

module.exports = {
  listCats,
  newCat,
  catDetails
};
