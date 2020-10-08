const CEP = require('../models/CEP');

const lookupCEP = (db) => async (req, res, next) =>
  CEP.lookup(req.query.cep, db)
    .then((cep) => res.json({ cep, message: null }))
    .catch(next);

module.exports = {
  lookupCEP,
};
