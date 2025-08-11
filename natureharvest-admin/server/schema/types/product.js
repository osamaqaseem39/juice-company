const { gql } = require('graphql-tag');

const productTypes = gql`
  type Product {
    _id: ID!
    name: String!
    slug: String!
    description: String!
    categoryId: Category!
    brandId: Brand
    images: [String!]!
    tags: [String!]
    rating: Float
    seo: SEO
    isActive: Boolean!
    createdAt: Date
    updatedAt: Date
  }

  type SEO {
    title: String
    description: String
    keywords: [String]
    slug: String
    canonicalUrl: String
    ogImage: String
    noIndex: Boolean
    noFollow: Boolean
  }

  input ProductInput {
    name: String!
    slug: String
    description: String!
    categoryId: ID!
    brandId: ID
    images: [String!]!
    tags: [String!]
    rating: Float
    seo: SEOInput
    isActive: Boolean
  }

  input SEOInput {
    title: String
    description: String
    keywords: [String]
    slug: String
    canonicalUrl: String
    ogImage: String
    noIndex: Boolean
    noFollow: Boolean
  }

  input ProductUpdateInput {
    name: String
    slug: String
    description: String
    categoryId: ID
    brandId: ID
    images: [String!]
    tags: [String!]
    rating: Float
    seo: SEOInput
    isActive: Boolean
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