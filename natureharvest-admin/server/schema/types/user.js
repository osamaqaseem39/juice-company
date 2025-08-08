const { gql } = require('graphql-tag');

const userTypes = gql`
  type User {
    _id: ID!
    fullName: String!
    email: String!
    phone: String
    roles: [String!]!
    addresses: [Address!]
    isActive: Boolean!
    createdAt: Date
    updatedAt: Date
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input UserInput {
    fullName: String!
    email: String!
    password: String!
    phone: String
    roles: [String!]
    isActive: Boolean
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    register(input: UserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;

module.exports = userTypes; 