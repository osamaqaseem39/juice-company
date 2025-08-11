const { gql } = require('graphql-tag');

const commonTypes = gql`
  type UserAddress {
    _id: ID!
    fullName: String!
    phone: String!
    street: String!
    city: String!
    state: String
    postalCode: String!
    country: String!
    isDefault: Boolean
  }

  input UserAddressInput {
    fullName: String!
    phone: String!
    street: String!
    city: String!
    state: String
    postalCode: String!
    country: String!
    isDefault: Boolean
  }
`;

module.exports = commonTypes; 