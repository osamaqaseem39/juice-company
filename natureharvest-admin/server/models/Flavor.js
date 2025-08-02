const mongoose = require('mongoose');

// Embedded Size schema
const sizeSchema = new mongoose.Schema({
  sizeLabel: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  barcode: {
    type: String,
    trim: true
  },
  weight: {
    type: Number, // in grams
    required: true
  },
  dimensions: {
    height: Number, // in cm
    width: Number,
    depth: Number
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { _id: true });

const flavorSchema = new mongoose.Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
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
  imageUrl: {
    type: String,
    trim: true
  },
  flavorProfile: {
    type: String,
    enum: ['sweet', 'tart', 'citrus', 'tropical', 'berry', 'herbal', 'spicy', 'smooth'],
    default: 'sweet'
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
    sugar: Number,
    vitaminC: Number,
    potassium: Number
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
  sizes: [sizeSchema],
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued', 'seasonal'],
    default: 'active'
  },
  seasonality: {
    startMonth: {
      type: Number,
      min: 1,
      max: 12
    },
    endMonth: {
      type: Number,
      min: 1,
      max: 12
    }
  }
}, {
  timestamps: true
});

// Index for search functionality
flavorSchema.index({ 
  name: 'text', 
  description: 'text', 
  'ingredients': 'text',
  tags: 'text'
});

// Virtual for brand relationship
flavorSchema.virtual('brand', {
  ref: 'Brand',
  localField: 'brandId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtuals are included in JSON output
flavorSchema.set('toJSON', { virtuals: true });
flavorSchema.set('toObject', { virtuals: true });

// Method to get available sizes
flavorSchema.methods.getAvailableSizes = function() {
  return this.sizes.filter(size => size.isAvailable && size.stock > 0);
};

// Method to check if flavor is in season
flavorSchema.methods.isInSeason = function() {
  if (!this.seasonality.startMonth || !this.seasonality.endMonth) {
    return true; // No seasonality specified
  }
  
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
  
  if (this.seasonality.startMonth <= this.seasonality.endMonth) {
    return currentMonth >= this.seasonality.startMonth && currentMonth <= this.seasonality.endMonth;
  } else {
    // Handles seasons that span across year end (e.g., Nov to Feb)
    return currentMonth >= this.seasonality.startMonth || currentMonth <= this.seasonality.endMonth;
  }
};

const Flavor = mongoose.model('Flavor', flavorSchema);
module.exports = Flavor; 