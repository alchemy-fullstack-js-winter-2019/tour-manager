const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const seedData = require('../seedData');
const Stop = require('../../lib/models/Stop');
const Tour = require('../../lib/models/Tour');

describe('tours route', () => {
  beforeAll(() => connect());

  beforeEach(done => mongoose.connection.dropDatabase(done));

  beforeEach(() => seedData({}));

  afterAll(() => mongoose.connection.close());

  it('can post a tour', () => {
    return request(app)
      .post('/tours')
      .send({
        title: 'Circus 2019',
        activities: ['Juggling', 'Twisting', 'Animal weirdness'],
        stops: ['1', '2', '3']
      })
      .then(res => expect(res.body).toEqual({
        title: 'Circus 2019',
        activities: ['Juggling', 'Twisting', 'Animal weirdness'],
        launchDate: expect.any(String),
        stops: ['1', '2', '3'],
        _id: expect.any(String)
      }));
  });

  it('can get a list of tours', () => {
    return request(app)
      .get('/tours')
      .then(res => expect(res.body).toHaveLength(10));
  });

  it('can get a tour by id', () => {
    return Stop
      .create({
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
      })
      .then(stop => {
        return Tour
          .create({
            title: 'Circus 2019',
            activities: ['Juggling', 'Twisting', 'Animal weirdness'],
            stops: [stop._id]
          });
      })
      .then(tour => {
        return request(app)
          .get(`/tours/${tour._id}`);
      })
      .then(res => expect(res.body).toEqual({
        title: 'Circus 2019',
        activities: ['Juggling', 'Twisting', 'Animal weirdness'],
        launchDate: expect.any(String),
        stops: [
          {
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
    
            attendance: 45,
            _id: expect.any(String)
          },
        ],
        _id: expect.any(String),
        __v: 0
      }));
  });
});
