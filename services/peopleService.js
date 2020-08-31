const peopleModel = require('../models/peopleModel');
const people = require('../controllers/peopleController');

const validateEmail = (email) => {
  if (!email) return false;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePersonData = (name, age, email) => {
  if (!name || name.length < 3) return { error: true, code: 'invalid_data', message: 'Nome inválido' };
  if (age <= 0) return { error: true, code: 'invalid_data', message: 'Idade deve ser maior que 0' };
  if (!validateEmail(email)) return { error: true, code: 'invalid_data', message: 'Email inválido' };
  return { error: false };
};

const getAllPeople = async () => peopleModel.getAllPeople();

const createPerson = async (name, age, email) => {
  const validation = validatePersonData(name, age, email);

  if (validation.error) return validation;

  const person = await peopleModel.createPerson(name, age, email);

  return person;
};

const getPersonById = async (id) => {
  const person = await peopleModel.getPersonById(id);

  if (!person) throw new Error(`person with id ${id} was not found`);

  return person;
};

const deletePerson = async (id) => {
  await peopleModel.deletePerson(id);
};

const updatePerson = async (id, { name, age, email }) => {
  const validation = validatePersonData(name, age, email);
  if (validation.error) return validation;

  const person = await getPersonById(id);

  if (person.error) return person;

  return peopleModel.updatePerson(id, { name, age, email });
};

module.exports = {
  getAllPeople,
  createPerson,
  getPersonById,
  deletePerson,
  updatePerson,
};