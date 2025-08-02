const { gql } = require('graphql-tag');

const serviceTypes = gql`
  type Service {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    duration: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  input ServiceInput {
    name: String!
    description: String!
    price: Float!
    duration: String!
    status: String
  }

  input ServiceUpdateInput {
    name: String
    description: String
    price: Float
    duration: String
    status: String
  }

  extend type Query {
    services: [Service!]!
    service(id: ID!): Service
    servicesByStatus(status: String!): [Service!]!
  }

  extend type Mutation {
    createService(input: ServiceInput!): Service!
    updateService(id: ID!, input: ServiceUpdateInput!): Service!
    deleteService(id: ID!): Boolean!
  }
`;

module.exports = serviceTypes; 