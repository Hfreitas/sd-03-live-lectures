const connect = require('./connect');

const getAll = async () =>
  connect()
    .then(db => db.getTable('authors')
      .select(['id', 'name', 'email'])
      .execute())
    .then(results => results.fetchAll())
    .then(rows => rows.map(([id, name, email]) => ({
      id,
      name,
      email
    })));

const getById = async (authorId) => {
  const db = await connect();

  const [author] = await db.getTable('authors')
    .select(['id', 'name', 'email'])
    .where('id = :id')
    .bind('id', authorId)
    .execute()
    .then(results => results.fetchAll());

  if (!author) return null;

  const [id, name, email] = author;

  return {
    id,
    name,
    email
  };
};

const insert = async (name, email) => {
  if (!name || !email) {
    return {
      error: true,
      message: 'Forneça nome e email'
    };
  }

  const db = await connect();

  const insertResult = await db.getTable('authors')
    .insert(['name', 'email'])
    .values([name, email])
    .execute();

  const id = insertResult.getAutoIncrementValue();

  return {
    id,
    name,
    email
  };
};

module.exports = {
  getAll,
  getById,
  insert
};