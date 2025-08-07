# Nature Harvest Admin API Documentation

## Overview

The Nature Harvest Admin API provides a comprehensive GraphQL and REST API for managing the juice company's backend operations. The API supports authentication, CRUD operations for various entities, and file uploads.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://juice-company-server.vercel.app`

## Authentication

All protected endpoints require authentication via JWT token. Include the token in the request headers:

```
x-auth-token: <your-jwt-token>
```

### Login

**GraphQL Mutation:**
```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      fullName
      email
      roles
      isActive
    }
  }
}
```

**Variables:**
```json
{
  "email": "admin@natureharvest.com",
  "password": "password123"
}
```

## GraphQL Endpoint

- **URL**: `/graphql`
- **Method**: POST
- **Content-Type**: application/json

## REST API Endpoints

### Authentication

#### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "admin@natureharvest.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "_id": "user-id",
    "fullName": "Admin User",
    "email": "admin@natureharvest.com",
    "roles": ["admin"],
    "isActive": true
  }
}
```

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "fullName": "New User",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "roles": ["customer"]
}
```

### Blogs

#### GraphQL Queries

**Get All Blogs:**
```graphql
query GetBlogs {
  blogs {
    _id
    title
    content
    status
    slug
    featuredImage
    createdAt
    updatedAt
  }
}
```

**Get Blog by ID:**
```graphql
query GetBlog($id: ID!) {
  blog(id: $id) {
    _id
    title
    content
    status
    slug
    featuredImage
    createdAt
    updatedAt
  }
}
```

**Get Blogs by Status:**
```graphql
query GetBlogsByStatus($status: String!) {
  blogsByStatus(status: $status) {
    _id
    title
    content
    status
    slug
    featuredImage
    createdAt
    updatedAt
  }
}
```

#### GraphQL Mutations

**Create Blog:**
```graphql
mutation CreateBlog($input: BlogInput!) {
  createBlog(input: $input) {
    _id
    title
    content
    status
    slug
    featuredImage
    createdAt
    updatedAt
  }
}
```

**Update Blog:**
```graphql
mutation UpdateBlog($id: ID!, $input: BlogInput!) {
  updateBlog(id: $id, input: $input) {
    _id
    title
    content
    status
    slug
    featuredImage
    createdAt
    updatedAt
  }
}
```

**Delete Blog:**
```graphql
mutation DeleteBlog($id: ID!) {
  deleteBlog(id: $id)
}
```

#### Blog Input Types

```graphql
input BlogInput {
  title: String!
  content: String!
  author: String
  featuredImage: String
  tags: [String!]
  status: String
}
```

### Products

#### GraphQL Queries

**Get All Products:**
```graphql
query GetProducts {
  products {
    _id
    name
    description
    images
    brandId {
      _id
      name
    }
    categoryId {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Get Product by ID:**
```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    _id
    name
    description
    images
    brandId {
      _id
      name
    }
    categoryId {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

#### GraphQL Mutations

**Create Product:**
```graphql
mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    _id
    name
    description
    images
    brandId {
      _id
      name
    }
    categoryId {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Update Product:**
```graphql
mutation UpdateProduct($id: ID!, $input: ProductInput!) {
  updateProduct(id: $id, input: $input) {
    _id
    name
    description
    images
    brandId {
      _id
      name
    }
    categoryId {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Delete Product:**
```graphql
mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
```

#### Product Input Types

```graphql
input ProductInput {
  name: String!
  description: String!
  images: [String!]
  brandId: ID
  categoryId: ID
  tags: [String!]
}
```

### Brands

#### GraphQL Queries

**Get All Brands:**
```graphql
query GetBrands {
  brands {
    _id
    name
    image
    description
    createdAt
    updatedAt
  }
}
```

**Get Brand by ID:**
```graphql
query GetBrand($id: ID!) {
  brand(id: $id) {
    _id
    name
    image
    description
    createdAt
    updatedAt
  }
}
```

#### GraphQL Mutations

**Create Brand:**
```graphql
mutation CreateBrand($input: BrandInput!) {
  createBrand(input: $input) {
    _id
    name
    image
    description
    createdAt
    updatedAt
  }
}
```

**Update Brand:**
```graphql
mutation UpdateBrand($id: ID!, $input: BrandInput!) {
  updateBrand(id: $id, input: $input) {
    _id
    name
    image
    description
    createdAt
    updatedAt
  }
}
```

**Delete Brand:**
```graphql
mutation DeleteBrand($id: ID!) {
  deleteBrand(id: $id)
}
```

#### Brand Input Types

```graphql
input BrandInput {
  name: String!
  image: String
  description: String
}
```

### Categories

#### GraphQL Queries

**Get All Categories:**
```graphql
query GetCategories {
  categories {
    _id
    name
    image
    description
    parent {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Get Category by ID:**
```graphql
query GetCategory($id: ID!) {
  category(id: $id) {
    _id
    name
    image
    description
    parent {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

#### GraphQL Mutations

**Create Category:**
```graphql
mutation CreateCategory($input: CategoryInput!) {
  createCategory(input: $input) {
    _id
    name
    image
    description
    parent {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Update Category:**
```graphql
mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
  updateCategory(id: $id, input: $input) {
    _id
    name
    image
    description
    parent {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Delete Category:**
```graphql
mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
```

#### Category Input Types

```graphql
input CategoryInput {
  name: String!
  image: String
  description: String
  parent: ID
}
```

### Subcategories

#### GraphQL Queries

**Get All Subcategories:**
```graphql
query GetSubcategories {
  subcategories {
    _id
    name
    image
    description
    parent {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Get Nested Subcategories:**
```graphql
query GetNestedSubcategories($parentId: ID!) {
  nestedSubcategories(parentId: $parentId) {
    _id
    name
    image
    description
    parent {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

#### GraphQL Mutations

**Create Subcategory:**
```graphql
mutation CreateSubcategory($input: SubcategoryInput!) {
  createSubcategory(input: $input) {
    _id
    name
    image
    description
    parent {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Update Subcategory:**
```graphql
mutation UpdateSubcategory($id: ID!, $input: SubcategoryInput!) {
  updateSubcategory(id: $id, input: $input) {
    _id
    name
    image
    description
    parent {
      _id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Delete Subcategory:**
```graphql
mutation DeleteSubcategory($id: ID!) {
  deleteSubcategory(id: $id)
}
```

#### Subcategory Input Types

```graphql
input SubcategoryInput {
  name: String!
  image: String
  description: String
  parent: ID!
}
```

### Services

#### GraphQL Queries

**Get All Services:**
```graphql
query GetServices {
  services {
    _id
    title
    description
    featuredImage
    createdAt
    updatedAt
  }
}
```

**Get Service by ID:**
```graphql
query GetService($id: ID!) {
  service(id: $id) {
    _id
    title
    description
    featuredImage
    createdAt
    updatedAt
  }
}
```

#### GraphQL Mutations

**Create Service:**
```graphql
mutation CreateService($input: ServiceInput!) {
  createService(input: $input) {
    _id
    title
    description
    featuredImage
    createdAt
    updatedAt
  }
}
```

**Update Service:**
```graphql
mutation UpdateService($id: ID!, $input: ServiceInput!) {
  updateService(id: $id, input: $input) {
    _id
    title
    description
    featuredImage
    createdAt
    updatedAt
  }
}
```

**Delete Service:**
```graphql
mutation DeleteService($id: ID!) {
  deleteService(id: $id)
}
```

#### Service Input Types

```graphql
input ServiceInput {
  title: String!
  description: String!
  featuredImage: String
}
```

### Quotes

#### GraphQL Queries

**Get All Quotes:**
```graphql
query GetQuotes {
  quotes {
    _id
    name
    email
    phone
    details
    image
    status
    createdAt
    updatedAt
  }
}
```

**Get Quote by ID:**
```graphql
query GetQuote($id: ID!) {
  quote(id: $id) {
    _id
    name
    email
    phone
    details
    image
    status
    createdAt
    updatedAt
  }
}
```

#### GraphQL Mutations

**Update Quote Status:**
```graphql
mutation UpdateQuote($id: ID!, $status: String!) {
  updateQuote(id: $id, status: $status) {
    _id
    name
    email
    phone
    details
    image
    status
    createdAt
    updatedAt
  }
}
```

**Delete Quote:**
```graphql
mutation DeleteQuote($id: ID!) {
  deleteQuote(id: $id)
}
```

### Users

#### GraphQL Queries

**Get All Users:**
```graphql
query GetUsers {
  users {
    _id
    fullName
    email
    phone
    roles
    isActive
    createdAt
    updatedAt
  }
}
```

**Get User by ID:**
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    _id
    fullName
    email
    phone
    roles
    isActive
    createdAt
    updatedAt
  }
}
```

**Get Current User:**
```graphql
query GetMe {
  me {
    _id
    fullName
    email
    phone
    roles
    isActive
    createdAt
    updatedAt
  }
}
```

#### GraphQL Mutations

**Create User:**
```graphql
mutation CreateUser($input: UserInput!) {
  createUser(input: $input) {
    _id
    fullName
    email
    phone
    roles
    isActive
    createdAt
    updatedAt
  }
}
```

**Update User:**
```graphql
mutation UpdateUser($id: ID!, $input: UserInput!) {
  updateUser(id: $id, input: $input) {
    _id
    fullName
    email
    phone
    roles
    isActive
    createdAt
    updatedAt
  }
}
```

**Delete User:**
```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
```

#### User Input Types

```graphql
input UserInput {
  fullName: String!
  email: String!
  password: String!
  phone: String
  roles: [String!]
  isActive: Boolean
}
```

### File Upload

#### REST Endpoints

**Upload Product Image:**
- **URL**: `/api/upload/product`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: `image` (file)

**Upload Brand/Category Image:**
- **URL**: `/api/upload/brand-category`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: `image` (file)

**Upload General Image:**
- **URL**: `/api/upload/general`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: `image` (file)

**Upload Brochure:**
- **URL**: `/api/upload/brochure`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: `file` (file)

## Error Handling

All API responses follow a consistent error format:

```json
{
  "errors": [
    {
      "message": "Error description",
      "path": ["fieldName"],
      "extensions": {
        "code": "ERROR_CODE"
      }
    }
  ]
}
```

### Common Error Codes

- `AUTHENTICATION_ERROR`: Invalid or missing authentication token
- `AUTHORIZATION_ERROR`: User doesn't have permission for the requested action
- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Requested resource not found
- `INTERNAL_SERVER_ERROR`: Unexpected server error

## Rate Limiting

- **GraphQL**: 100 requests per minute per IP
- **REST API**: 100 requests per minute per IP
- **File Upload**: 10 uploads per minute per user

## CORS Configuration

The API supports the following origins:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:5173`
- `http://localhost:4173`
- `https://natureharvest.osamaqaseem.online`
- `https://juice-company-server.vercel.app`
- `https://natureharvest-admin.vercel.app`
- `https://natureharvest-web.vercel.app`

## Health Check

**GET /** - Server health status

**Response:**
```json
{
  "status": "healthy",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "mongodb": {
    "isConnected": true,
    "state": "connected",
    "database": "natureharvest",
    "host": "localhost",
    "port": 27017,
    "models": ["User", "Blog", "Product", "Brand", "Category"],
    "collections": ["users", "blogs", "products", "brands", "categories"]
  },
  "server": {
    "uptime": 3600,
    "memory": {
      "rss": 123456789,
      "heapTotal": 987654321,
      "heapUsed": 123456789,
      "external": 123456
    },
    "cpu": {
      "user": 123456,
      "system": 123456
    },
    "env": "production",
    "nodeVersion": "v18.0.0",
    "platform": "linux"
  }
}
```

## Swagger Documentation

When running in development mode, Swagger documentation is available at:
- **URL**: `/api-docs`
- **Description**: Interactive API documentation with testing capabilities

## Database Models

### User
- `_id`: ObjectId
- `fullName`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `phone`: String
- `roles`: Array of Strings (default: ['customer'])
- `addresses`: Array of Address ObjectIds
- `isActive`: Boolean (default: true)
- `createdAt`: Date
- `updatedAt`: Date

### Blog
- `_id`: ObjectId
- `title`: String (required)
- `content`: String (required)
- `author`: ObjectId (ref: User)
- `featuredImage`: String
- `slug`: String (auto-generated)
- `tags`: Array of Strings
- `status`: String (enum: ['draft', 'published'], default: 'draft')
- `createdAt`: Date
- `updatedAt`: Date

### Product
- `_id`: ObjectId
- `name`: String (required)
- `description`: String
- `images`: Array of Strings
- `brandId`: ObjectId (ref: Brand)
- `categoryId`: ObjectId (ref: Category)
- `tags`: Array of Strings
- `createdAt`: Date
- `updatedAt`: Date

### Brand
- `_id`: ObjectId
- `name`: String (required)
- `image`: String
- `description`: String
- `createdAt`: Date
- `updatedAt`: Date

### Category
- `_id`: ObjectId
- `name`: String (required)
- `image`: String
- `description`: String
- `parent`: ObjectId (ref: Category, for subcategories)
- `createdAt`: Date
- `updatedAt`: Date

### Service
- `_id`: ObjectId
- `title`: String (required)
- `description`: String (required)
- `featuredImage`: String
- `createdAt`: Date
- `updatedAt`: Date

### Quote
- `_id`: ObjectId
- `name`: String (required)
- `email`: String (required)
- `phone`: String (required)
- `details`: String (required)
- `image`: String
- `status`: String (default: 'pending')
- `createdAt`: Date
- `updatedAt`: Date

## Environment Variables

Required environment variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/natureharvest

# JWT
JWT_SECRET=your-secret-key-here

# Server
PORT=3000
NODE_ENV=development

# File Upload (optional)
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Local Development

1. Install dependencies: `npm install`
2. Set environment variables
3. Start server: `npm start`
4. Access GraphQL Playground: `http://localhost:3000/graphql`

## Support

For API support and questions:
- Email: support@natureharvest.com
- Documentation: https://natureharvest.com/api-docs
- GitHub Issues: https://github.com/natureharvest/api/issues 