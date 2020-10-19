const axios = require('axios');

const BASE_URL = 'https://pokeapi.co/api/v2/';

const getPokemonById = async (id) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${id}`);

  return {
    id: response.data.id,
    name: response.data.name,
    species: response.data.species,
  };
};

const getAllByTypeId = async (id) => {
  const response = await axios.get(`${BASE_URL}/type/${id}`);
  return response.data.pokemon;
};

const searchItemsByName = async (name) => {
  const response = await axios.get(`${BASE_URL}/item`);
  const results = response.data.results;
  return results.filter((res) => res.name.includes(name));
};

module.exports = {
  getPokemonById,
  getAllByTypeId,
  searchItemsByName,
};
