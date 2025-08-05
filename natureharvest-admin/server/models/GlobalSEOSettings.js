const mongoose = require('mongoose');

const globalSEOSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    trim: true
  },
  defaultTitle: {
    type: String,
    trim: true
  },
  defaultDescription: {
    type: String,
    trim: true
  },
  defaultOgImage: {
    type: String,
    trim: true
  },
  twitterHandle: {
    type: String,
    trim: true
  },
  fbAppId: {
    type: String,
    trim: true
  },
  googleAnalyticsId: {
    type: String,
    trim: true
  },
  defaultCanonicalUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Ensure only one instance exists
globalSEOSettingsSchema.statics.getInstance = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = new this({
      siteName: 'Nature Harvest',
      defaultTitle: 'Nature Harvest - Premium Organic Juice Company',
      defaultDescription: 'Discover premium organic juices and healthy beverages from Nature Harvest. Fresh, natural, and delicious.',
      defaultOgImage: '/images/og-default.jpg',
      twitterHandle: '@natureharvest',
      fbAppId: '',
      googleAnalyticsId: '',
      defaultCanonicalUrl: 'https://natureharvest.com'
    });
    await settings.save();
  }
  return settings;
};

module.exports = mongoose.model('GlobalSEOSettings', globalSEOSettingsSchema); 