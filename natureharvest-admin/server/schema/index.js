const { gql } = require('graphql-tag');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Import type definitions
const commonTypes = require('./types/common');
const userTypes = require('./types/user');
const blogTypes = require('./types/blog');
const productTypes = require('./types/product');
const brandTypes = require('./types/brand');
const categoryTypes = require('./types/category');
const quoteTypes = require('./types/quote');
const serviceTypes = require('./types/service');
const companyTypes = require('./types/company');
const flavorTypes = require('./types/flavor');
const ecommerceTypes = require('./ecommerce');

// Import resolvers
const userResolvers = require('./resolvers/user');
const blogResolvers = require('./resolvers/blog');
const productResolvers = require('./resolvers/product');
const brandResolvers = require('./resolvers/brand');
const categoryResolvers = require('./resolvers/category');
const quoteResolvers = require('./resolvers/quote');
const serviceResolvers = require('./resolvers/service');
const companyResolvers = require('./resolvers/company');
const flavorResolvers = require('./resolvers/flavor');
const ecommerceResolvers = require('./resolvers/ecommerce');

// Base Query and Mutation types
const baseSchema = gql`
  scalar Date

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
  commonTypes,
  userTypes,
  blogTypes,
  productTypes,
  brandTypes,
  categoryTypes,
  quoteTypes,
  serviceTypes,
  companyTypes,
  flavorTypes,
  ecommerceTypes
];

// Combine all resolvers
const resolvers = [
  userResolvers,
  blogResolvers,
  productResolvers,
  brandResolvers,
  categoryResolvers,
  quoteResolvers,
  serviceResolvers,
  companyResolvers,
  flavorResolvers,
  ecommerceResolvers
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

// Add Date scalar resolver
mergedResolvers.Date = {
  __serialize(value) {
    return value.toISOString();
  },
  __parseValue(value) {
    return new Date(value);
  },
  __parseLiteral(ast) {
    if (ast.kind === 'StringValue') {
      return new Date(ast.value);
    }
    return null;
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: mergedResolvers,
});

module.exports = schema; 