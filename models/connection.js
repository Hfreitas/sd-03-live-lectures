const { MongoClient } = require('mongodb');

const connect = () => MongoClient.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(connection => connection.db('restful-app'));

module.exports = {
  connect
};