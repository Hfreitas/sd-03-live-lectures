const { ObjectId } = require('mongodb');

const { connect } = require('./connection');

const getAllPeople = async () => connect()
  .then(db => db
    .collection('people')
    .find({})
    .toArray());

const createPerson = async (name, age, email) => connect()
  .then(db => db.collection('people').insertOne({ name, age, email }))
  .then(({ insertedId }) => ({ _id: insertedId, name, age, email }));

const getPersonById = async (id) => connect()
  .then(db => db.collection('people').findOne(ObjectId(id)));

const deletePerson = async (id) => connect()
  .then(db => db.collection('people').deleteOne({ _id: ObjectId(id) }));

const updatePerson = async (id, { name, email, age }) => connect()
  .then(db => db.collection('people').updateOne({ _id: ObjectId(id) }, { $set: { name, email, age } }))
  .then(() => ({ _id: id, name, email, age }));

module.exports = {
  getAllPeople,
  createPerson,
  getPersonById,
  deletePerson,
  updatePerson,
};