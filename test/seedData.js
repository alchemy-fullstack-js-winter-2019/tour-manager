const Tour = require('../lib/models/Tour');
const Stop = require('../lib/models/Stop');
const Chance = require('chance');
const chance = new Chance();

const TOURS = 10;
const STOPS = 20;


const air = ['good', 'bad'];
module.exports = ({ totalTours = TOURS, totalStops = STOPS }) => {
  return Promise.all(
    [...Array(totalStops)].map(() => Stop.create({
      location: {
        city: chance.city(),
        state: chance.state(),
        zip: chance.zip()
      },

      weather: {
        temperature: chance.integer({ min: 1 }),
        wind: chance.integer({ min: 0, max: 100 }),
        airQ: chance.pickone(air)
      },

      attendance: chance.integer({ min: 1 })
    }))
  )
    .then(stops => {
      return Promise.all(
        [...Array(totalTours)].map(() => {
          return Tour.create({
            title: chance.word(),

            activities: [...Array(3)].map(() => chance.word()),

            stops: [...Array(6)].map(() => chance.pickone(stops)._id)
          });
        })
      );
    });
};
