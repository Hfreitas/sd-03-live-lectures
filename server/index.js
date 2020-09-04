const boom = require('@hapi/boom');
const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');

const people = [
  { id: 0, name: 'Roz', age: 23 },
  { id: 1, name: 'Marco', age: 26 }
];

const app = express();

app.use(bodyParser.json());
app.use(middlewares.logger);

const searchPeople = (req, res, next) => {
  if (!req.query.name) return next();

  const results = people.filter(person => person.name.includes(req.query.name));
  return res.status(200).json(results);
};

const getAllPeople = (req, res) => {
  return res.status(200).json(people);
};

app.get('/people', searchPeople);
app.get('/people', getAllPeople);

app.get('/people/:id', middlewares.auth(false), (req, res, next) => {
  const { id } = req.params;

  const person = people.find(person => person.id === parseInt(id, 10));

  if (!person) {
    return next(boom.notFound('pessoa não encontrada'));
  }

  return res.status(200).json(person);
});

app.post('/people', middlewares.auth(true), (req, res) => {
  const { name, age } = req.body;
  const id = people.length;

  people.push({ id, name, age });

  res.status(201).json({ id, name, age });
});

app.use(middlewares.boomError);

const PORT = 3000;
app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });