const axios = require('axios');
const Pokedex = require('./Pokedex');

const BASE_URL = 'https://pokeapi.co/api/v2/';

jest.mock('axios');

describe('Pokedex Model', () => {
  describe('Get pokemon by ID', () => {
    test('When getting a Pokemon with id 1, should return an single Pokemon with id, name and species', async () => {
      /* Arrange */
      const mockData = {
        data: {
          id: 1,
          name: 'bulbasaur',
          species: {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
          },
        },
      };

      axios.get.mockResolvedValueOnce(mockData);

      /* Act */
      const res = await Pokedex.getPokemonById(1);

      /* Assert */
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/pokemon/1`);
      expect(res).toStrictEqual(mockData.data);
    });

    test('When getting a Pokemon with an unexsisting id, should thrown an error', async () => {
      /* Arrange */
      axios.get.mockResolvedValueOnce({ status: 404 });
      try {
        /* Act */
        await Pokedex.getPokemonById(1);
      } catch (err) {
        /* Assert */
        expect(err.message).toBe("Cannot read property 'id' of undefined");
      }
    });
  });
});
