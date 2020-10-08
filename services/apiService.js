const axios = require('axios').default;

const findCEP = (cep) =>
  axios
    .get(`http://cep.la/${cep}`, { headers: { Accept: 'application/json' } })
    .then((response) => response.data)
    .then((data) => (Array.isArray(data) ? null : data));

module.exports = {
  findCEP,
};
