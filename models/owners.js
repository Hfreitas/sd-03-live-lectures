const connect = require('./connect');
const { ObjectId } = require('mongodb');

const getAll = async () => connect()
  .then(db => db.collection('owners').find({}).toArray());

const getById = async (id) =>
  connect().then(db => db.collection('owners').findOne(ObjectId(id)));

const add = async ({ name, phone, email }) =>
  connect()
    .then(db => db.collection('owners').insertOne({ name, phone, email }));

module.exports = {
  getAll,
  getById,
  add,
};