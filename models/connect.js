const mysqlx = require('@mysql/xdevapi');

let schema;

module.exports = () => schema
  ? Promise.resolve(schema)
  : mysqlx
    .getSession({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 33060
    })
    .then(async (session) => {
      schema = await session.getSchema('live_lecture_31_1');
      return schema;
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });