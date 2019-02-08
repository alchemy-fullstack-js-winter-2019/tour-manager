const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const seedData = require('../seedData');
const mongoose = require('mongoose');
const Tour = require('../../lib/models/Tour');

describe('tours route', () => {
  beforeAll(() => connect());

  beforeEach(done => mongoose.connection.dropDatabase(done));

  beforeEach(() => seedData({}));

  afterAll(() => mongoose.connection.close());

  it('posts a new stop', () => {
    return Tour
      .create({
        title: 'Circus 2019',
        activities: ['Juggling', 'Twisting', 'Animal weirdness'],
        stops: ['1', '2', '3']
      })
      .then(tour => {
        return request(app)
          .post(`/tours/${tour._id}/stops`)
          .send({
            location: {
              city: 'Wilsonville',
              state: 'OR',
              zip: 97070
            },
    
            weather: {
              temperature: 40,
              wind: 10,
              airQ: 'good'
            },
    
            attendance: 45
          });
      })
      .then(res => expect(res.body).toEqual({
        title: 'Circus 2019',
        activities: ['Juggling', 'Twisting', 'Animal weirdness'],
        launchDate: expect.any(String),
        stops: ['1', '2', '3', expect.any(String)],
        _id: expect.any(String)
      }));
  });
});
