const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  title: String,
  description: String,
  keywords: [String],
  slug: String,
  canonicalUrl: String,
  ogImage: String,
  noIndex: {
    type: Boolean,
    default: false
  },
  noFollow: {
    type: Boolean,
    default: false
  }
});

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  logoUrl: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  seo: {
    type: seoSchema,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Brand', brandSchema); 