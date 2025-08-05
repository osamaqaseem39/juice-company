const { gql } = require('graphql-tag');

const companyTypes = gql`
  type Company {
    _id: ID!
    name: String!
    description: String
    logoUrl: String
    website: String
    contactEmail: String
    contactPhone: String
    address: Address
    status: String!
    createdAt: Date
    updatedAt: Date
    brands: [Brand!]
  }

  type Address {
    street: String
    city: String
    state: String
    zip: String
    country: String
  }

  input CompanyInput {
    name: String!
    description: String
    logoUrl: String
    website: String
    contactEmail: String
    contactPhone: String
    address: AddressInput
    status: String
  }

  input AddressInput {
    street: String
    city: String
    state: String
    zip: String
    country: String
  }

  input CompanyUpdateInput {
    name: String
    description: String
    logoUrl: String
    website: String
    contactEmail: String
    contactPhone: String
    address: AddressInput
    status: String
  }

  extend type Query {
    companies(search: String, status: String, sort: String, limit: Int, offset: Int): [Company!]!
    company(id: ID!): Company
    companiesByStatus(status: String!): [Company!]!
  }

  extend type Mutation {
    createCompany(input: CompanyInput!): Company!
    updateCompany(id: ID!, input: CompanyUpdateInput!): Company!
    deleteCompany(id: ID!): Boolean!
  }
`;

module.exports = companyTypes; 