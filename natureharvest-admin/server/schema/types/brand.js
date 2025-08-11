const { gql } = require('graphql-tag');

const brandTypes = gql`
  type Brand {
    _id: ID!
    name: String!
    description: String
    logoUrl: String
    tagline: String
    category: String!
    ingredients: [String!]
    nutritionalInfo: NutritionalInfo
    allergens: [String!]
    certifications: [String!]
    status: String!
    createdAt: Date
    updatedAt: Date
    flavors: [Flavor!]
  }

  type NutritionalInfo {
    calories: Float
    protein: Float
    carbs: Float
    fat: Float
    fiber: Float
    sugar: Float
  }

  input BrandInput {
    name: String!
    description: String
    logoUrl: String
    tagline: String
    category: String
    ingredients: [String!]
    nutritionalInfo: NutritionalInfoInput
    allergens: [String!]
    certifications: [String!]
    status: String
  }

  input NutritionalInfoInput {
    calories: Float
    protein: Float
    carbs: Float
    fat: Float
    fiber: Float
    sugar: Float
  }

  input BrandUpdateInput {
    name: String
    description: String
    logoUrl: String
    tagline: String
    category: String
    ingredients: [String!]
    nutritionalInfo: NutritionalInfoInput
    allergens: [String!]
    certifications: [String!]
    status: String
  }

  extend type Query {
    brands(search: String, category: String, status: String, sort: String, limit: Int, offset: Int): [Brand!]!
    brand(id: ID!): Brand
    brandsByCategory(category: String!): [Brand!]!
    brandsByStatus(status: String!): [Brand!]!
  }

  extend type Mutation {
    createBrand(input: BrandInput!): Brand!
    updateBrand(id: ID!, input: BrandUpdateInput!): Brand!
    deleteBrand(id: ID!): Boolean!
  }
`;

module.exports = brandTypes; 