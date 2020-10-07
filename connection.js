const mysqlx = require('@mysql/xdevapi');

let schema;

const connection = () => {
  return schema ? Promise.resolve(schema) : mysqlx
    .getSession({
      user: 'root' /* Se necessário, altere o user */,
      password: '' /* Não se esqueça de inserir a senha aqui! */,
      host: 'localhost',
      port: 33060,
      schema: 'solid_example',
    })
    .then((session) => {
      schema = session.getSchema('solid_example');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;