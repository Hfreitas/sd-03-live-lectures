require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_SCHEMA } = process.env;

let schema = null;

const connect = () => schema
  ? Promise.resolve(schema)
  : mysqlx.getSession({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    schema: DB_SCHEMA
  })
    .then(session => {
      schema = schema || session.getSchema(DB_SCHEMA);
      return schema;
    });

module.exports = connect;
