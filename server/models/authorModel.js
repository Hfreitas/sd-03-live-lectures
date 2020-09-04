const connect = require('./connect');

const getAll = async () => connect()
  .then(db =>
    db
      .collection('authors')
      .find({})
      .toArray()
  );

const create = async (name, email) => connect()
  .then(db =>
    db.collection('authors')
      .insertOne({ name, email }))
  .then(result => ({ _id: result.insertedId, name, email }));

module.exports = {
  getAll,
  create
};