const { gql } = require('graphql-tag');

const quoteTypes = gql`
  type Quote {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    details: String!
    image: String
    status: String!
    createdAt: String!
    updatedAt: String
  }

  input QuoteInput {
    name: String!
    email: String!
    phone: String!
    details: String!
    image: String
    status: String
  }

  input QuoteUpdateInput {
    name: String
    email: String
    phone: String
    details: String
    image: String
    status: String
  }

  extend type Query {
    quotes: [Quote!]!
    quote(id: ID!): Quote
    quotesByStatus(status: String!): [Quote!]!
  }

  extend type Mutation {
    createQuote(input: QuoteInput!): Quote!
    updateQuote(id: ID!, input: QuoteUpdateInput!): Quote!
    deleteQuote(id: ID!): Boolean!
  }
`;

module.exports = quoteTypes; 