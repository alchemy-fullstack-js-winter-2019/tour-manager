const { Router } = require('express');
const wunderground = require('../middleware/wunderground');
const Tour = require('../models/Tour');
const Stop = require('../models/Stop');

let stopId = '';
const updateTour = (req, res, next) => {
  return Tour
    .findById(req.params.tourId)
    .then(tour => {
      let updatedStops = tour.stops.slice();
      updatedStops.push(stopId);
      return Tour
        .findByIdAndUpdate(req.params.tourId, { stops: updatedStops }, { new: true });
    })
    .then(updatedTour => res.send(updatedTour))
    .catch(next);
};

module.exports = Router()
  .post('/:tourId', wunderground, (req, res, next) => {
    stopId = req.params.stopId;
    if(!stopId) {
      Stop
        .create(req.body)
        .then(stop => {
          stopId = stop._id;
          updateTour(req, res, next);
        });
    }
    else {
      updateTour(req, res, next);
    }
  });

