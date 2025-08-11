const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
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

const Size = mongoose.model('Size', sizeSchema);
module.exports = Size; 