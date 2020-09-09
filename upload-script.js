const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const stream = fs.createReadStream(path.join(__dirname, 'meu-arquivo.txt'));

const form = new FormData();
form.append('arquivo', stream);
form.append('name', 'Roz');

const formHeaders = form.getHeaders();

console.log(formHeaders);

axios.post('http://localhost:3000/upload', form, {
  headers: formHeaders,
})
  .then((response) => response.data)
  .then(console.log)
  .catch((err) => console.error(err.message, err.stack));
