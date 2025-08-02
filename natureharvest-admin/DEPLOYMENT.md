# Nature Harvest Admin - Deployment Guide

## 🚀 Vercel Deployment

This project is configured for deployment on Vercel with both server and client components.

### 📁 Project Structure

```
natureharvest-admin/
├── client/          # React frontend
├── server/          # Node.js/Express backend
├── vercel.json      # Vercel configuration
├── package.json     # Root package.json
└── .vercelignore    # Files to exclude from deployment
```

### 🔧 Configuration Files

#### `vercel.json`
- Configures both server and client builds
- Routes API calls to the server
- Serves static files from client build
- Handles GraphQL endpoint

#### `package.json` (Root)
- Defines workspace structure
- Provides build scripts for both client and server
- Manages dependencies for the entire project

### 🛠️ Build Process

1. **Server Build**: Node.js server with Express and GraphQL
2. **Client Build**: React application with TypeScript and Tailwind CSS
3. **Static Assets**: Served from client build directory

### 🌐 Environment Variables

Set these in your Vercel dashboard:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### 📋 Deployment Steps

1. **Connect to Vercel**:
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables** in Vercel dashboard

3. **Deploy**:
   ```bash
   git push origin main
   ```

### 🔍 Troubleshooting

#### Build Errors
- Ensure all dependencies are installed
- Check that `index.html` exists in `client/public/`
- Verify Node.js version compatibility
- **Package Name Conflicts**: Ensure client and server packages have unique names
- **Workspace Issues**: Check that workspace names don't conflict

#### API Issues
- Confirm MongoDB connection string is correct
- Check that all routes are properly registered in `server.js`
- Verify JWT secret is set

#### Static File Issues
- Ensure client build completes successfully
- Check that static assets are in the correct directories
- Verify Vercel routes configuration

### 📊 Monitoring

- **Health Check**: `GET /` - Server and database status
- **API Documentation**: `GET /api-docs` - Swagger documentation
- **GraphQL Playground**: `POST /graphql` - GraphQL queries

### 🔐 Security

- JWT authentication for protected routes
- CORS configured for cross-origin requests
- Input validation with express-validator
- File upload security with multer

### 📝 API Endpoints

- **Authentication**: `/api/auth/*`
- **Products**: `/api/products/*`
- **Categories**: `/api/categories/*`
- **Brands**: `/api/brands/*`
- **Suppliers**: `/api/suppliers/*`
- **Services**: `/api/services/*`
- **Quotes**: `/api/quotes/*`
- **Blogs**: `/api/blogs/*`
- **GraphQL**: `/graphql`

### 🧪 Testing

Use the provided Postman collection:
`Juice-Company-API-Tests.postman_collection.json`

### 📞 Support

For deployment issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with `npm run dev`
4. Review server logs for errors 