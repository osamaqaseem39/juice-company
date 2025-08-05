const { gql } = require('graphql-tag');

const userTypes = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    createdAt: Date
    updatedAt: Date
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    role: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    updateUser(id: ID!, input: RegisterInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;

module.exports = userTypes; 