# Apollo Server GraphQL API

This server has been migrated from Express.js REST API to Apollo Server GraphQL API.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

4. **Access GraphQL Playground:**
   Visit `http://localhost:3000/graphql` in your browser

## 📚 GraphQL Endpoints

### Base URL
- **GraphQL Endpoint:** `http://localhost:3000/graphql`
- **Health Check:** `http://localhost:3000/`
- **Swagger Docs:** `http://localhost:3000/api-docs` (development only)

## 🔐 Authentication

All mutations (except register/login) require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

## 📊 Available Types

### User
- **Queries:** `users`, `user(id)`, `me`
- **Mutations:** `register`, `login`, `updateUser`, `deleteUser`

### Blog
- **Queries:** `blogs`, `blog(id)`, `blogsByStatus`
- **Mutations:** `createBlog`, `updateBlog`, `deleteBlog`

### Product
- **Queries:** `products`, `product(id)`, `productsByCategory`, `productsByBrand`
- **Mutations:** `createProduct`, `updateProduct`, `deleteProduct`

### Brand
- **Queries:** `brands`, `brand(id)`, `brandsByStatus`
- **Mutations:** `createBrand`, `updateBrand`, `deleteBrand`

### Category
- **Queries:** `categories`, `category(id)`, `categoriesByStatus`, `subcategories`, `subcategory(id)`, `subcategoriesByCategory`
- **Mutations:** `createCategory`, `updateCategory`, `deleteCategory`, `createSubCategory`, `updateSubCategory`, `deleteSubCategory`

### Supplier
- **Queries:** `suppliers`, `supplier(id)`, `suppliersByStatus`, `supplierRequests`, `supplierRequest(id)`
- **Mutations:** `createSupplier`, `updateSupplier`, `deleteSupplier`, `createSupplierRequest`, `updateSupplierRequest`, `deleteSupplierRequest`

### Quote
- **Queries:** `quotes`, `quote(id)`, `quotesByStatus`
- **Mutations:** `createQuote`, `updateQuote`, `deleteQuote`

### Service
- **Queries:** `services`, `service(id)`, `servicesByStatus`
- **Mutations:** `createService`, `updateService`, `deleteService`

## 🔍 Example Queries

### Get All Users
```graphql
query {
  users {
    _id
    name
    email
    role
    createdAt
  }
}
```

### Login User
```graphql
mutation {
  login(input: {
    email: "user@example.com"
    password: "password123"
  }) {
    token
    user {
      _id
      name
      email
      role
    }
  }
}
```

### Get All Blogs
```graphql
query {
  blogs {
    _id
    title
    content
    author {
      name
      email
    }
    status
    createdAt
  }
}
```

### Create a Blog (requires authentication)
```graphql
mutation {
  createBlog(input: {
    title: "My First Blog"
    content: "This is the content of my blog post"
    status: "published"
  }) {
    _id
    title
    content
    status
    createdAt
  }
}
```

## 🛠️ Development

### Testing the Schema
Run the schema test:
```bash
node test-graphql.js
```

### File Structure
```
server/
├── schema/
│   ├── index.js          # Main schema file
│   ├── types/            # GraphQL type definitions
│   │   ├── user.js
│   │   ├── blog.js
│   │   ├── product.js
│   │   ├── brand.js
│   │   ├── category.js
│   │   ├── supplier.js
│   │   ├── quote.js
│   │   └── service.js
│   └── resolvers/        # GraphQL resolvers
│       ├── user.js
│       ├── blog.js
│       ├── product.js
│       ├── brand.js
│       ├── category.js
│       ├── supplier.js
│       ├── quote.js
│       └── service.js
├── models/               # Mongoose models
├── middleware/           # Express middleware
│   └── graphqlAuth.js   # GraphQL authentication
└── server.js            # Main server file
```

## 🔧 Configuration

### Apollo Server Configuration
- **Schema:** Combined from all type definitions
- **Context:** Includes user authentication and database models
- **Error Handling:** Custom error formatting
- **Plugins:** HTTP server drain plugin for graceful shutdown

### Authentication
- JWT-based authentication
- Token extraction from Authorization header
- User context available in all resolvers

### Database
- MongoDB with Mongoose ODM
- Connection retry logic
- Health check middleware

## 🚨 Error Handling

GraphQL errors are formatted and logged. Common error types:
- **Authentication errors:** Invalid or missing JWT token
- **Validation errors:** Invalid input data
- **Database errors:** Connection or query issues
- **Authorization errors:** Insufficient permissions

## 📈 Monitoring

The server includes:
- MongoDB connection monitoring
- Server health checks
- Memory and CPU usage tracking
- GraphQL error logging

## 🔄 Migration from REST

This server was migrated from Express.js REST API to Apollo Server GraphQL. The migration included:

1. **Schema Definition:** Converted REST endpoints to GraphQL types and operations
2. **Resolver Implementation:** Converted Express route handlers to GraphQL resolvers
3. **Authentication:** Adapted JWT middleware for GraphQL context
4. **Error Handling:** Implemented GraphQL-specific error handling
5. **Server Configuration:** Updated server.js to use Apollo Server

## 🎯 Next Steps

1. **Test all GraphQL operations** using the playground
2. **Update frontend** to use GraphQL queries instead of REST calls
3. **Add subscriptions** for real-time updates if needed
4. **Implement caching** with Apollo Server plugins
5. **Add rate limiting** for production use 