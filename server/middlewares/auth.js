const boom = require('@hapi/boom');

module.exports = (isAuthRequired = true) => {
  return (req, res, next) => {
    if (req.header.authorization) {
      req.user = {
        name: 'Roz'
      };

      return next();
    }

    if (!isAuthRequired) return next();

    return next(boom.unauthorized('No authorization header'));
  };
};
