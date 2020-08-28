const Cats = require('../models/cats');
const Owners = require('../models/owners');

const add = async (data) => {
  const { owner, cat } = data;

  const isCatValid = typeof cat.name === 'string' &&
    cat.name.length >= 3 &&
    cat.name.length < 30 &&
    cat.age &&
    cat.age > 0;

  if (!isCatValid) return { error: true, message: 'Dados do gato inválidos' };

  const createdOwner = await Owners.add(owner);

  Cats.add(cat.name, cat.age, createdOwner.insertedId);

  return true;
};

const getAll = () => Cats.getAll();

const getById = (id) => Cats.getCatById(id);

module.exports = { add, getAll, getById };