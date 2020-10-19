const Pokedex = require('../models/Pokedex');
const pokedexController = require('./pokedexController');

describe('Controllers', () => {
  describe('Get Pokemon by Id', () => {
    test('When requesting a pokemon with ID 1, should return a single pokemon with ID 1 and a 200 HTTP status', async () => {
      /* Arrange  */
      const mockData = {
        id: 1,
        name: 'bulbasaur',
        species: {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
        },
      };

      const getOneSpy = jest.spyOn(Pokedex, 'getPokemonById').mockResolvedValueOnce(mockData);

      const mockReq = {
        params: {
          id: 1,
        },
      };

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      /* Act */
      await pokedexController.getPokemonById(mockReq, mockRes);

      /* Assert */
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockData);

      /* Cleanup */
      getOneSpy.mockRestore();
    });

    test('Whem requesting a pokemon with an unexisting ID, should return a 404 HTTP status and an error message', async () => {
      /* Arrange */
      const mockData = null;

      const getOneSpy = jest.spyOn(Pokedex, 'getPokemonById').mockResolvedValueOnce(mockData);

      const mockReq = {
        params: {
          id: 1,
        },
      };

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      /* Act */
      await pokedexController.getPokemonById(mockReq, mockRes);

      /* Assert */
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Pokemon não encontrado' });

      /* Cleanup */
      getOneSpy.mockRestore();
    });

    test('When something went wrong while calling the model, should return a 500 and an error message', async () => {
      /* Arrange */
      const getOneSpy = jest.spyOn(Pokedex, 'getPokemonById').mockRejectedValue(new Error());

      const mockReq = {
        params: {
          id: 1,
        },
      };

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      /* Act */
      await pokedexController.getPokemonById(mockReq, mockRes);

      /* Assert */
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Algo deu errado' });

      /* Cleanup */
      getOneSpy.mockRestore();
    });
  });
});
