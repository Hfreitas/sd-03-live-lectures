const connect = require('./connect');

const getAll = async () =>
  connect()
    .then((db) => db.getTable('cats').select(['name', 'age']).execute())
    .then((results) => results.fetchAll())
    .then((cats) => cats.map(([name, age]) => ({ name, age })));

const getCatById = async (id) =>
  connect()
    .then((db) =>
      db
        .getTable('cats')
        .select(['name', 'age'])
        .where('id = :id')
        .bind('id', id)
        .execute()
    )
    .then((results) => results.fetchAll()[0])
    .then(([name, age] = []) => (name ? { name, age } : null));

const add = (name, age) =>
  connect().then((db) =>
    db.getTable('cats').insert(['name', 'age']).values(name, age).execute()
  );

const isValid = (name, age) =>
  typeof name === 'string' &&
  name.length >= 3 &&
  name.length < 30 &&
  age &&
  age > 0;

module.exports = {
  getAll,
  getCatById,
  add,
  isValid
};