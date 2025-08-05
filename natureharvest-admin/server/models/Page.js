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

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  seo: {
    type: seoSchema,
    default: {}
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Create slug from title if not provided
pageSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

// Set publishedAt when publishing
pageSchema.pre('save', function(next) {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Page', pageSchema); 