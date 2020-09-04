require('dotenv/config');
const { MongoClient } = require('mongodb');

const { DB_URI, DB_DBNAME } = process.env;

const connect = async () => MongoClient.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(connection => connection.db(DB_DBNAME));

module.exports = connect;