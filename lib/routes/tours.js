const { Router } = require('express');
const Tour = require('../models/Tour');
const Stop = require('../models/Stop');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, activities, launchDate, stops } = req.body;
    Tour
      .create({ title, activities, launchDate, stops })
      .then(tour => res.send(tour))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tour
      .find()
      .then(tours => res.send(tours))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    let tour = null;
    Tour
      .findById(req.params.id)
      .lean()
      .then(foundTour => {
        tour = foundTour;
        return Promise.all(tour.stops.map(stopId => {
          return Stop
            .findById(stopId)
            .then(stop => stop);
        }));
      })
      .then(foundStops => {
        tour.stops = foundStops;
        res.send(tour);
      })
      .catch(next);
  });
