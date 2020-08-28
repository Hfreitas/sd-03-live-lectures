const connect = require('./connect');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connect().then((db) => db.collection('cats').find({}).toArray());

const getCatById = async (id) =>
  connect().then((db) => db.collection('cats').findOne(ObjectId(id)));

const add = (name, age, ownerId) =>
  connect().then((db) => db.collection('cats').insertOne({ name, age, ownerId }));

module.exports = {
  getAll,
  getCatById,
  add
};