const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  location: {
    type: Object,
    required: [true, 'Location required']
  },

  weather: {
    type: Object
  },

  attendance: {
    type: Number,
    min: 1
  }
},

{
  toJSON:{
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Stop', stopSchema);
