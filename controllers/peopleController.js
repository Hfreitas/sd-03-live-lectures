const boom = require('@hapi/boom');
const { Router } = require('express');
const rescue = require('express-rescue');

const peopleService = require('../services/peopleService');

const people = Router();

people.get('/', rescue(async (_, res) => {
  const people = await peopleService.getAllPeople();

  res.status(200).json(people);
}));

people.post('/', rescue(async (req, res, next) => {
  const { name, age, email } = req.body;

  const person = await peopleService.createPerson(name, age, email);

  if (person.error) {
    return next(boom.badData(person.message));
  }

  return res.status(201).json(person);
}));

people.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const person = await peopleService.getPersonById(id);

  if (person.error) {
    return next(boom.notFound(person.message));
  }

  return res.status(200).json(person);
}));

people.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  await peopleService.deletePerson(id);

  return res.status(204).end();
}));

people.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  const newPerson = await peopleService.updatePerson(id, { name, age, email });

  if (newPerson.error) {
    const error = newPerson.code === 'not_found'
      ? boom.notFound(newPerson.message)
      : boom.badData(newPerson.message);

    return next(error);
  }

  return res.status(200).json(newPerson);
}));

module.exports = people;
