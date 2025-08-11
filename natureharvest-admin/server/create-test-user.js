const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Import User model
const User = require('./models/User');

async function createTestUser() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      return;
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('✅ Test user already exists');
      console.log(`Email: ${existingUser.email}`);
      console.log(`Full Name: ${existingUser.fullName}`);
      console.log(`Roles: ${existingUser.roles.join(', ')}`);
      return;
    }

    // Create test user
    const testUser = new User({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      roles: ['admin'],
      isActive: true
    });

    await testUser.save();
    console.log('✅ Test user created successfully');
    console.log(`Email: ${testUser.email}`);
    console.log(`Full Name: ${testUser.fullName}`);
    console.log(`Password: password123`);
    console.log(`Roles: ${testUser.roles.join(', ')}`);

  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run if called directly
if (require.main === module) {
  createTestUser().catch(console.error);
}

module.exports = { createTestUser }; 