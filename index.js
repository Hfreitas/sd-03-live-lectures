const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const { DB_URI, PORT = 3000 } = process.env;

async function start() {
  const pool = await mysql.createPool({ uri: DB_URI });

  const app = express();

  app.use(bodyParser.json());

  app.post('/', async (req, res) => {
    const { name } = req.body;

    const [
      { insertId: id },
    ] = await pool.query('INSERT INTO `rows` (`name`) VALUES (?);', [name]);

    res.status(201).json({ id, name });
  });

  app.get('/', async (_req, res) => {
    const [rows] = await pool.query('SELECT * FROM `rows`;');

    res.status(200).json(rows);
  });

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

start().catch(console.error);
