const express = require('express');
const mysql = require('@mysql/xdevapi');
const bodyParser = require('body-parser');

const { DB_URI, DB_NAME, PORT = 3000 } = process.env;

async function start() {
  const schema = await mysql
    .getSession(DB_URI)
    .then((session) => session.getSchema(DB_NAME));

  const app = express();

  app.use(bodyParser.json());

  app.post('/', async (req, res) => {
    const { name } = req.body;

    const id = await schema
      .getTable('rows')
      .insert(['name'])
      .values([name])
      .execute()
      .then((result) => result.getAutoIncrementValue());

    res.status(201).json({ id, name });
  });

  app.get('/', async (_req, res) => {
    const rows = await schema
      .getTable('rows')
      .select(['id', 'name'])
      .execute()
      .then((query) => query.fetchAll())
      .then((results) => results.map(([id, name]) => ({ id, name })));

    res.status(200).json(rows);
  });

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

start().catch(console.error);
