const mongoose = require('mongoose');

// Flavor sub-schema
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
}, { _id: true });

// Size sub-schema
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
}, { _id: true });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    default: null
  },
  gallery: [{
    type: String
  }],
  brand: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  subCategory: {
    type: String,
    default: ''
  },
  flavors: [flavorSchema],
  sizes: [sizeSchema]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product; 