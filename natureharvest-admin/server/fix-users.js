const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const User = require('./models/User');

async function fixUsers() {
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

    // Find users with null or empty fullName
    const usersWithNullName = await User.find({
      $or: [
        { fullName: null },
        { fullName: undefined },
        { fullName: '' },
        { fullName: { $exists: false } }
      ]
    });

    console.log(`Found ${usersWithNullName.length} users with null/empty fullName`);

    if (usersWithNullName.length > 0) {
      // Update users with null fullName
      for (const user of usersWithNullName) {
        console.log(`Fixing user: ${user.email} (ID: ${user._id})`);
        
        // Set a default fullName based on email or use a generic name
        let newFullName = 'Unknown User';
        if (user.email) {
          const emailPrefix = user.email.split('@')[0];
          newFullName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
        }
        
        await User.findByIdAndUpdate(user._id, {
          fullName: newFullName
        });
        
        console.log(`✅ Updated user ${user.email} with fullName: ${newFullName}`);
      }
    }

    // Also check for users with very short fullName
    const usersWithShortName = await User.find({
      fullName: { $regex: /^.{0,1}$/ }
    });

    console.log(`Found ${usersWithShortName.length} users with very short fullName`);

    if (usersWithShortName.length > 0) {
      for (const user of usersWithShortName) {
        console.log(`Fixing user with short name: ${user.email} (ID: ${user._id})`);
        
        let newFullName = 'Unknown User';
        if (user.email) {
          const emailPrefix = user.email.split('@')[0];
          newFullName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
        }
        
        await User.findByIdAndUpdate(user._id, {
          fullName: newFullName
        });
        
        console.log(`✅ Updated user ${user.email} with fullName: ${newFullName}`);
      }
    }

    // Verify all users now have valid fullName
    const allUsers = await User.find({});
    console.log(`\nTotal users in database: ${allUsers.length}`);
    
    const usersWithValidName = allUsers.filter(user => 
      user.fullName && 
      user.fullName.trim().length >= 2
    );
    
    console.log(`Users with valid fullName: ${usersWithValidName.length}`);
    console.log(`Users with invalid fullName: ${allUsers.length - usersWithValidName.length}`);

    if (allUsers.length - usersWithValidName.length > 0) {
      console.log('\nUsers that still need fixing:');
      allUsers.forEach(user => {
        if (!user.fullName || user.fullName.trim().length < 2) {
          console.log(`- ${user.email}: "${user.fullName}"`);
        }
      });
    } else {
      console.log('✅ All users now have valid fullName values!');
    }

  } catch (error) {
    console.error('❌ Error fixing users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run if called directly
if (require.main === module) {
  fixUsers().catch(console.error);
}

module.exports = { fixUsers }; 