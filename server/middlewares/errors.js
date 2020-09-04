const boom = require('@hapi/boom');

module.exports = (err, _req, res, _next) => {
  if (!boom.isBoom(err)) return res.status(500).send(`<h1>Erro Desconhecido: ${err.message}</h1>`);

  res.status(err.output.statusCode).send(`<h1>Erro: ${err.output.payload.message}</h1>`);
};