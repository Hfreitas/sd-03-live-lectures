/**
 * @jest-environment node
 */
const Joi = require('joi');
const axios = require('axios');
const mongodb = require('mongodb');

const workerSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
});

const errorSchema = Joi.object({
  code: Joi.string().required(),
  error: Joi.boolean().required(),
  message: Joi.string().required(),
});

describe('Workers API', () => {
  let connection;

  beforeAll(async () => {
    connection = await mongodb.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    connection.close();
  });

  describe('GET /:id', () => {
    describe('Quando o worker existe', () => {
      let response;

      beforeAll(async () => {
        await connection
          .db('workersApp')
          .collection('workers')
          .insertOne({
            _id: mongodb.ObjectId('0b2b15c1444bb20cb1ccc3d6'),
            name: 'Fulano',
            phone: '123123213',
            email: 'uasudhusa@asudhsau.com',
            address: 'asdohasdousah',
          });

        response = await axios
          .get('http://localhost:3000/workers/0b2b15c1444bb20cb1ccc3d6')
          .catch((err) => err.response);
      });

      afterAll(async () => {
        await connection
          .db('workersApp')
          .collection('workers')
          .deleteOne({ _id: mongodb.ObjectId('0b2b15c1444bb20cb1ccc3d6') });
      });

      test('Deve retornar um objeto contendo um worker e o status HTTP 200', () => {
        expect(response.status).toBe(200);
        expect(workerSchema.validate(response.data)).not.toHaveProperty(
          'error'
        );
      });
    });

    describe('Quando o worker não existe', () => {
      let response;

      beforeAll(async () => {
        response = await axios
          .get('http://localhost:3000/workers/0b2b15c1444bb20cb1ccc3d6')
          .catch((err) => err.response);
      });

      test('Deve retornar um objeto de erro e o status HTTP 404', () => {
        expect(response.status).toBe(404);
        expect(errorSchema.validate(response.data)).not.toHaveProperty('error');
      });
    });
  });
});
