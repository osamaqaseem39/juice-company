const { gql } = require('graphql-tag');

const productTypes = gql`
  type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    category: Category!
    brand: Brand!
    images: [String!]
    specifications: String
    status: String!
    createdAt: Date
    updatedAt: Date
  }

  input ProductInput {
    name: String!
    description: String!
    price: Float!
    category: ID!
    brand: ID!
    images: [String!]
    specifications: String
    status: String
  }

  input ProductUpdateInput {
    name: String
    description: String
    price: Float
    category: ID
    brand: ID
    images: [String!]
    specifications: String
    status: String
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product
    productsByCategory(categoryId: ID!): [Product!]!
    productsByBrand(brandId: ID!): [Product!]!
  }

  extend type Mutation {
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductUpdateInput!): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;

module.exports = productTypes; 