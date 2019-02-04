const { Router } = require('express');
const Tour = require('../models/Tour');

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
  });
