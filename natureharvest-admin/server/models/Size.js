const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 0
  },
  weight: {
    type: Number, // in grams
    min: 0
  },
  dimensions: {
    height: Number, // in cm
    width: Number,
    depth: Number
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Add text index for search functionality
sizeSchema.index({ name: 'text', description: 'text' });

const Size = mongoose.model('Size', sizeSchema);
module.exports = Size; 