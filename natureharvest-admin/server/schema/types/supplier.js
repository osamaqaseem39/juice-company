const { gql } = require('graphql-tag');

const supplierTypes = gql`
  type Supplier {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    address: String!
    company: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type SupplierRequest {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    company: String!
    message: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  input SupplierInput {
    name: String!
    email: String!
    phone: String!
    address: String!
    company: String!
    status: String
  }

  input SupplierUpdateInput {
    name: String
    email: String
    phone: String
    address: String
    company: String
    status: String
  }

  input SupplierRequestInput {
    name: String!
    email: String!
    phone: String!
    company: String!
    message: String!
    status: String
  }

  extend type Query {
    suppliers: [Supplier!]!
    supplier(id: ID!): Supplier
    suppliersByStatus(status: String!): [Supplier!]!
    supplierRequests: [SupplierRequest!]!
    supplierRequest(id: ID!): SupplierRequest
  }

  extend type Mutation {
    createSupplier(input: SupplierInput!): Supplier!
    updateSupplier(id: ID!, input: SupplierUpdateInput!): Supplier!
    deleteSupplier(id: ID!): Boolean!
    createSupplierRequest(input: SupplierRequestInput!): SupplierRequest!
    updateSupplierRequest(id: ID!, input: SupplierRequestInput!): SupplierRequest!
    deleteSupplierRequest(id: ID!): Boolean!
  }
`;

module.exports = supplierTypes; 