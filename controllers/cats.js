const CatModel = require('../models/cats');

const listCats = async (_req, res) => {
  const cats = await CatModel.getAll();

  res.render('listCats', { cats, message: null });
};

const newCat = async (req, res) => {
  const { name, age } = req.body;

  if (!CatModel.isValid(name, age)) {
    res.status(402).render('listCats', { cats: null, message: 'Nome ou idade inválidos' });
  }

  await CatModel.add(name, parseInt(age, 10));

  res.status(201).render('success');
};

const catDetails = async (req, res) => {
  const { id } = req.params;

  const cat = await CatModel.getCatById(id);

  if (!cat) return res.status(404).render('notFound');

  res.status(200).render('catDetails', { cat });
};

module.exports = {
  listCats,
  newCat,
  catDetails
};
