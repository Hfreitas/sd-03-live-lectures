const { ObjectId } = require('mongodb');

module.exports = (connection) => ({
  getAll: async () => connection.collection('workers').find({}).toArray(),
  create: async (name, phone, email, address) =>
    connection
      .collection('workers')
      .insertOne({ name, phone, email, address })
      .then(({ insertedId }) => {
        _id: insertedId, name, phone, email, address;
      }),
  findById: async (id) =>
    !ObjectId.isValid(id)
      ? null
      : connection.collection('workers').findOne({ _id: ObjectId(id) }),
  findByEmail: (email) => connection.collection('workers').findOne({ email }),
});
