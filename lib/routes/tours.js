const { Router } = require('express');
const Tour = require('../models/Tour');

module.exports = Router()
  .get('/', (req, res, next) => {
    Tour
      .find()
      .then(tours => res.send(tours))
      .catch(next);
  });
