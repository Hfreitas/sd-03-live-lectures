const getWorkerModel = require('../models/workers');

describe('Workers model', () => {
  describe('getAll', () => {
    test('Deve retornar um array', async () => {
      // Arrange
      const toArrayMock = jest.fn().mockResolvedValue([]);
      const connectionMock = {
        collection: () => ({
          find: () => ({
            toArray: toArrayMock,
          }),
        }),
      };

      const workerModel = getWorkerModel(connectionMock);

      // Act
      const result = await workerModel.getAll();

      // Assert
      expect(result).toHaveProperty('length');
      expect(toArrayMock).toHaveBeenCalledTimes(1);
    });
  });
});
