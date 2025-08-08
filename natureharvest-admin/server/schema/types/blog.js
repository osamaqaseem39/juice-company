const { gql } = require('graphql-tag');

const blogTypes = gql`
  type Blog {
    _id: ID!
    title: String!
    content: String!
    author: String
    featuredImage: String
    slug: String
    tags: [String!]
    status: String!
    createdAt: Date
    updatedAt: Date
  }

  input BlogInput {
    title: String!
    content: String!
    author: String
    featuredImage: String
    tags: [String!]
    status: String
  }

  input BlogUpdateInput {
    title: String
    content: String
    author: String
    featuredImage: String
    tags: [String!]
    status: String
  }

  extend type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
    blogsByStatus(status: String!): [Blog!]!
  }

  extend type Mutation {
    createBlog(input: BlogInput!): Blog!
    updateBlog(id: ID!, input: BlogInput!): Blog!
    deleteBlog(id: ID!): Boolean!
  }
`;

module.exports = blogTypes; 