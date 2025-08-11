const { gql } = require('graphql-tag');

const sizeTypes = gql`
  type Size {
    _id: ID!
    name: String!
    description: String
    imageUrl: String
    price: Float
    weight: Float
    dimensions: Dimensions
    isAvailable: Boolean!
    status: String!
    createdAt: Date
    updatedAt: Date
  }

  type Dimensions {
    height: Float
    width: Float
    depth: Float
  }

  input SizeInput {
    name: String!
    description: String
    imageUrl: String
    price: Float
    weight: Float
    dimensions: DimensionsInput
    isAvailable: Boolean
    status: String
  }

  input DimensionsInput {
    height: Float
    width: Float
    depth: Float
  }

  input SizeUpdateInput {
    name: String
    description: String
    imageUrl: String
    price: Float
    weight: Float
    dimensions: DimensionsInput
    isAvailable: Boolean
    status: String
  }

  extend type Query {
    sizes(search: String, status: String, isAvailable: Boolean, sort: String, limit: Int, offset: Int): [Size!]!
    size(id: ID!): Size
    sizesByStatus(status: String!): [Size!]!
    availableSizes: [Size!]!
  }

  extend type Mutation {
    createSize(input: SizeInput!): Size!
    updateSize(id: ID!, input: SizeUpdateInput!): Size!
    deleteSize(id: ID!): Boolean!
  }
`;

module.exports = sizeTypes; 