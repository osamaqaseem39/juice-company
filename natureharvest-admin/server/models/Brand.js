const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
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
  tagline: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['organic', 'natural', 'premium', 'budget', 'kids'],
    default: 'natural'
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
    sugar: Number
  },
  allergens: [{
    type: String,
    enum: ['nuts', 'dairy', 'soy', 'gluten', 'eggs', 'none'],
    default: 'none'
  }],
  certifications: [{
    type: String,
    enum: ['organic', 'non-gmo', 'vegan', 'gluten-free', 'dairy-free', 'kosher', 'halal'],
    default: []
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for search functionality
brandSchema.index({ name: 'text', description: 'text', tagline: 'text' });

// Virtual for company relationship
brandSchema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtuals are included in JSON output
brandSchema.set('toJSON', { virtuals: true });
brandSchema.set('toObject', { virtuals: true });

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand; 