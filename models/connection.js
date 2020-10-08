const mongoClient = require('mongodb').MongoClient;

connection = (uri) =>
  mongoClient
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('cep_exercise'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
