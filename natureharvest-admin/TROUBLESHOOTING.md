# 🚨 Troubleshooting Guide

## 500 Internal Server Error

If you're getting a 500 Internal Server Error on your deployed application, follow these steps:

### 🔍 **Step 1: Check Environment Variables**

The most common cause is missing environment variables. In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
```

### 🔍 **Step 2: Check Vercel Logs**

1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Functions" tab
4. Click on the function that's failing
5. Check the "Logs" tab for error messages

### 🔍 **Step 3: Test Database Connection**

You can test if your MongoDB connection is working by visiting:
```
https://your-app.vercel.app/
```

This should return a JSON response with server status.

### 🔍 **Step 4: Common Issues & Solutions**

#### **Issue: "MONGODB_URI environment variable is not set"**
**Solution**: Set the MONGODB_URI in Vercel environment variables

#### **Issue: "MongoDB connection failed"**
**Solutions**:
- Check if your MongoDB Atlas cluster is accessible
- Verify your IP whitelist includes Vercel's IPs
- Ensure your connection string is correct

#### **Issue: "JWT_SECRET is not set"**
**Solution**: Set JWT_SECRET in Vercel environment variables

#### **Issue: "Module not found"**
**Solution**: Check that all dependencies are properly installed

### 🔧 **Environment Variables Setup**

#### **For MongoDB Atlas:**
1. Create a MongoDB Atlas account
2. Create a cluster
3. Get your connection string
4. Replace `<username>`, `<password>`, and `<dbname>` with your values

#### **For JWT Secret:**
Generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 📋 **Vercel Environment Variables Setup**

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add these variables:**

| Variable | Value | Environment |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://...` | Production |
| `JWT_SECRET` | `your_secret_key` | Production |
| `NODE_ENV` | `production` | Production |

### 🔍 **Testing Your Setup**

#### **1. Test Health Check:**
```bash
curl https://your-app.vercel.app/
```

Expected response:
```json
{
  "status": "healthy",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "mongodb": {
    "isConnected": true,
    "state": "connected"
  }
}
```

#### **2. Test API Endpoints:**
```bash
# Test authentication
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

### 🛠️ **Local Testing**

Before deploying, test locally:

1. **Create `.env` file:**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

2. **Run locally:**
```bash
cd natureharvest-admin
npm run dev
```

3. **Test endpoints:**
```bash
curl http://localhost:3000/
```

### 📞 **Getting Help**

If you're still having issues:

1. **Check Vercel logs** for specific error messages
2. **Verify environment variables** are set correctly
3. **Test database connection** locally first
4. **Check MongoDB Atlas** cluster status
5. **Review the deployment guide** in `DEPLOYMENT.md`

### 🔗 **Useful Links**

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Vercel Function Logs](https://vercel.com/docs/concepts/functions/function-logs)

### 📊 **Monitoring**

Once deployed successfully, monitor your application:

- **Health Check**: `GET /` - Server and database status
- **API Documentation**: `GET /api-docs` - Swagger docs
- **GraphQL Playground**: `POST /graphql` - GraphQL queries

### 🧪 **Testing with Postman**

Use the provided Postman collection:
`Juice-Company-API-Tests.postman_collection.json`

Update the `base_url` variable to your deployed URL. 