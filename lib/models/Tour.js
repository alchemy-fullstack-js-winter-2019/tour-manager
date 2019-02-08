const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required'],
  },
  
  activities: {
    type: [String]
  },

  launchDate: {
    type: Date,
    default: Date.now()
  },

  stops: {
    type: [String]
  }
},

{
  toJSON:{
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Tour', tourSchema);
