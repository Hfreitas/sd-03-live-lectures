const boom = require('@hapi/boom');

module.exports = (err, req, res, next) => {
  if (!boom.isBoom(err)) next(err);

  return res.status(err.output.status).json({ error: err.output.message });
};