const { gql } = require('graphql-tag');

const categoryTypes = gql`
  type Category {
    _id: ID!
    name: String!
    description: String!
    image: String
    status: String!
    createdAt: Date
    updatedAt: Date
    subcategories: [SubCategory!]
  }

  type SubCategory {
    _id: ID!
    name: String!
    description: String!
    category: Category!
    status: String!
    createdAt: Date
    updatedAt: Date
  }

  input CategoryInput {
    name: String!
    description: String!
    image: String
    status: String
  }

  input CategoryUpdateInput {
    name: String
    description: String
    image: String
    status: String
  }

  input SubCategoryInput {
    name: String!
    description: String!
    category: ID!
    status: String
  }

  input SubCategoryUpdateInput {
    name: String
    description: String
    category: ID
    status: String
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category
    categoriesByStatus(status: String!): [Category!]!
    subcategories: [SubCategory!]!
    subcategory(id: ID!): SubCategory
    subcategoriesByCategory(categoryId: ID!): [SubCategory!]!
  }

  extend type Mutation {
    createCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryUpdateInput!): Category!
    deleteCategory(id: ID!): Boolean!
    createSubCategory(input: SubCategoryInput!): SubCategory!
    updateSubCategory(id: ID!, input: SubCategoryUpdateInput!): SubCategory!
    deleteSubCategory(id: ID!): Boolean!
  }
`;

module.exports = categoryTypes; 