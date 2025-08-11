const mongoose = require('mongoose');

const flavorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const Flavor = mongoose.model('Flavor', flavorSchema);
module.exports = Flavor; 