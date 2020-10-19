const rescue = require('express-rescue');
const Pokedex = require('../models/Pokedex.js');

const getPokemonById = rescue(async (req, res) => {
  try {
    const pokemon = await Pokedex.getPokemonById(req.params.id);

    if (!pokemon) {
      res.status(404).json({ message: 'Pokemon não encontrado' });
    }

    res.status(200).json(pokemon);
  } catch (e) {
    if (process.env.NODE_ENV !== 'test') console.log(e);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

const getAllByTypeId = rescue(async (req, res) => {
  try {
    const types = await Pokedex.getAllByTypeId(req.params.id);

    res.status(200).json(types);
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

const searchItemsByName = rescue(async (req, res) => {
  const items = await Pokedex.searchItemsByName(req.params.term);

  if (items.length === 0) {
    res.status(404).json({ message: 'Nenhum item encontrado com esse termo' });
  }

  res.status(200).json(items);
});

module.exports = {
  getPokemonById,
  searchItemsByName,
  getAllByTypeId,
};
