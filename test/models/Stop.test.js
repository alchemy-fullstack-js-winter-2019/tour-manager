require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Stop = require('../../lib/models/Stop');

describe('Stop Model', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  afterAll(() => mongoose.connection.close());

  it('validates a good model', () => {
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
      .then(stop => expect(stop.toJSON()).toEqual({
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
        
        _id: expect.any(mongoose.Types.ObjectId)
      }));
  });
});
