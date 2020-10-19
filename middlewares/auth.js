const isTokenValid = (token = '') => {
  const regex = /^([a-zA-Z0-9 _-]+)$/;
  return token.length === 16 && regex.test(token);
};

const checkAuthToken = (req, res, next) => {
  if (isTokenValid(req.headers.authorization)) {
    return next();
  }

  res.status(401).json({ message: 'Token inválido!' });
};

module.exports = checkAuthToken;
