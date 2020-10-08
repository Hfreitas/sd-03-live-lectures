const apiService = require('../services/apiService');

const lookup = async (cep, db) => {
  if (!isValid(cep)) throw new Error('CEP inválido');

  const cepData = await findCEP(cep, db);

  if (cepData) return cepData;

  const cepFound = await getCepFromApi(cep);
  await saveCEP(cepFound, db);
  return cepFound;
};

const isValid = (cep) => cep && cep.match(/^\d{5}-?\d{3}$/);

const findCEP = async (cep, db) => {
  const results = await db.collection('ceps').findOne({ cep });

  if (!results) return null;

  return results;
};

const saveCEP = async (cepData, db) => {
  const { uf, cidade, bairro, logradouro, cep } = cepData;

  const result = await db
    .collection('ceps')
    .insertOne({ uf, cidade, bairro, logradouro, cep });

  return result;
};

const getCepFromApi = (cep) =>
  apiService.findCEP(cep).then((cepData) => {
    if (!cepData) throw new Error('CEP não encontrado');

    return cepData;
  });

module.exports = {
  lookup,
};
