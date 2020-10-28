const express = require('express');
const mysql = require('@mysql/xdevapi');

const { DB_URI, DB_NAME } = process.env;

async function start() {
  const schema = await mysql.getSession(DB_URI).getSchema(DB_NAME);

  const app = express();

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
}

start().catch(console.error);
