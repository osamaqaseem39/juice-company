const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  carrier: {
    type: String,
    required: true,
    trim: true
  },
  trackingNumber: {
    type: String,
    required: true,
    trim: true
  },
  shippedAt: {
    type: Date,
    required: true
  },
  estimatedDeliveryDate: {
    type: Date
  },
  deliveredAt: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'shipped', 'in_transit', 'delivered', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Virtual for order relationship
shipmentSchema.virtual('order', {
  ref: 'Order',
  localField: 'orderId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtuals are included in JSON output
shipmentSchema.set('toJSON', { virtuals: true });
shipmentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Shipment', shipmentSchema);