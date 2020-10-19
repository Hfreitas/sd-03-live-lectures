const checkAuthToken = require('./auth');

describe('Middleware', () => {
  describe('Token validation', () => {
    test('When passing an invalid token, should return a 401 with a invalid token message in JSON format', async () => {
      const mockReq = {
        headers: { authorization: '123123' },
      };

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      const mockNext = jest.fn();

      checkAuthToken(mockReq, mockRes, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Token inválido!' });
    });

    test('When passing a valid token, should call the next function', async () => {
      const mockReq = {
        headers: { authorization: 'ABCdEfG123TrlJCk' },
      };

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      const mockNext = jest.fn();

      checkAuthToken(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockJson).not.toHaveBeenCalled();
    });
  });
});
