const mongodb = require('mongodb').MongoClient;

const MONGODB_URL = 'mongodb://localhost:27017';

module.exports = () =>
  mongodb.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(connection => connection.db('animaldb'))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
