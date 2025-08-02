const { gql } = require('graphql-tag');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Import type definitions
const userTypes = require('./types/user');
const blogTypes = require('./types/blog');
const productTypes = require('./types/product');
const brandTypes = require('./types/brand');
const categoryTypes = require('./types/category');
const supplierTypes = require('./types/supplier');
const quoteTypes = require('./types/quote');
const serviceTypes = require('./types/service');
const companyTypes = require('./types/company');
const flavorTypes = require('./types/flavor');

// Import resolvers
const userResolvers = require('./resolvers/user');
const blogResolvers = require('./resolvers/blog');
const productResolvers = require('./resolvers/product');
const brandResolvers = require('./resolvers/brand');
const categoryResolvers = require('./resolvers/category');
const supplierResolvers = require('./resolvers/supplier');
const quoteResolvers = require('./resolvers/quote');
const serviceResolvers = require('./resolvers/service');
const companyResolvers = require('./resolvers/company');
const flavorResolvers = require('./resolvers/flavor');

// Base Query and Mutation types
const baseSchema = gql`
  type Query {
    _: Boolean
  }
  
  type Mutation {
    _: Boolean
  }
  
  type Subscription {
    _: Boolean
  }
`;

// Combine all type definitions
const typeDefs = [
  baseSchema,
  userTypes,
  blogTypes,
  productTypes,
  brandTypes,
  categoryTypes,
  supplierTypes,
  quoteTypes,
  serviceTypes,
  companyTypes,
  flavorTypes
];

// Combine all resolvers
const resolvers = [
  userResolvers,
  blogResolvers,
  productResolvers,
  brandResolvers,
  categoryResolvers,
  supplierResolvers,
  quoteResolvers,
  serviceResolvers,
  companyResolvers,
  flavorResolvers
];

// Merge resolvers
const mergedResolvers = resolvers.reduce((acc, resolver) => {
  if (resolver.Query) {
    acc.Query = { ...acc.Query, ...resolver.Query };
  }
  if (resolver.Mutation) {
    acc.Mutation = { ...acc.Mutation, ...resolver.Mutation };
  }
  if (resolver.Subscription) {
    acc.Subscription = { ...acc.Subscription, ...resolver.Subscription };
  }
  // Add other resolver types
  Object.keys(resolver).forEach(key => {
    if (!['Query', 'Mutation', 'Subscription'].includes(key)) {
      acc[key] = { ...acc[key], ...resolver[key] };
    }
  });
  return acc;
}, {});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: mergedResolvers,
});

module.exports = schema; 