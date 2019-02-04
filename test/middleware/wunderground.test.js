const wunderground = require('../../lib/middleware/wunderground');

describe('Wunderground Middleware', () => {
  it('does not change req.body', () => {
    const req = {};
    const res = '';
    const next = () => {
      console.log('next called');
      expect(req.body).toEqual(stop);
    };

    const stop = {
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
    };

    req.body = stop;

    wunderground(req, res, next);
  });
});
