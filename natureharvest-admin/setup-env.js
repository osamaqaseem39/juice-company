#!/usr/bin/env node

const crypto = require('crypto');

console.log('🔧 Nature Harvest Admin - Environment Setup');
console.log('===========================================\n');

// Generate JWT Secret
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('🔐 JWT Secret (add this to your environment variables):');
console.log(`JWT_SECRET=${jwtSecret}\n`);

// MongoDB URI template
console.log('🗄️  MongoDB URI Template:');
console.log('MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority\n');

// Environment variables summary
console.log('📋 Required Environment Variables:');
console.log('==================================');
console.log('MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log('NODE_ENV=production\n');

// Vercel setup instructions
console.log('🚀 Vercel Setup Instructions:');
console.log('============================');
console.log('1. Go to your Vercel dashboard');
console.log('2. Select your project');
console.log('3. Go to Settings → Environment Variables');
console.log('4. Add the variables above');
console.log('5. Redeploy your application\n');

// Test instructions
console.log('🧪 Testing Instructions:');
console.log('=======================');
console.log('1. After setting environment variables, redeploy');
console.log('2. Test health check: curl https://your-app.vercel.app/');
console.log('3. Check Vercel logs for any errors');
console.log('4. Use the Postman collection for API testing\n');

console.log('✅ Setup complete! Follow the instructions above to configure your deployment.'); 