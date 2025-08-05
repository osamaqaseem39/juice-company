const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  discountType: {
    type: String,
    required: true,
    enum: ['percentage', 'fixed'],
    default: 'percentage'
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderValue: {
    type: Number,
    min: 0
  },
  maxDiscountAmount: {
    type: Number,
    min: 0
  },
  expiryDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Check if coupon is valid
couponSchema.methods.isValid = function() {
  if (!this.isActive) return false;
  if (this.expiryDate && new Date() > this.expiryDate) return false;
  return true;
};

// Check if user can use this coupon
couponSchema.methods.canBeUsedBy = function(userId) {
  return !this.usedBy.includes(userId);
};

// Calculate discount amount
couponSchema.methods.calculateDiscount = function(orderAmount) {
  if (this.minOrderValue && orderAmount < this.minOrderValue) {
    return 0;
  }
  
  let discount = 0;
  if (this.discountType === 'percentage') {
    discount = (orderAmount * this.value) / 100;
  } else {
    discount = this.value;
  }
  
  if (this.maxDiscountAmount && discount > this.maxDiscountAmount) {
    discount = this.maxDiscountAmount;
  }
  
  return discount;
};

module.exports = mongoose.model('Coupon', couponSchema); 