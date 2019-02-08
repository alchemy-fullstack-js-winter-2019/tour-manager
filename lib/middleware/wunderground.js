const Stop = require('../models/Stop');

module.exports = (req, res, next) => {
  return Stop
    .find({ $where: `this.location.zip == ${req.body.location.zip}` })
    .then(stop => {
      if(stop[0]) req.body = { stopId: stop._id };
      next();
    });
};
