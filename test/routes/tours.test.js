const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const seedData = require('../seedData');

describe('tours route', () => {
  beforeAll(() => connect());

  beforeEach(done => mongoose.connection.dropDatabase(done));

  beforeEach(() => seedData({}));

  afterAll(() => mongoose.connection.close());

  it('can get a list of tours', () => {
    return request(app)
      .get('/tours')
      .then(res => expect(res.body).toHaveLength(10));
  });
});
