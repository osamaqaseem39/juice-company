import { gql } from '@apollo/client';

// Auth Mutations
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// Blog Mutations
export const CREATE_BLOG = gql`
  mutation CreateBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      _id
      title
      content
      status
      slug
      featuredImage
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: ID!, $input: UpdateBlogInput!) {
    updateBlog(id: $id, input: $input) {
      _id
      title
      content
      status
      slug
      featuredImage
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      _id
      title
    }
  }
`;

// Product Mutations
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      _id
      title
      description
      featuredImage
      gallery
      brand
      category
      subCategory
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      _id
      title
      description
      featuredImage
      gallery
      brand
      category
      subCategory
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      _id
      title
    }
  }
`;

// Service Mutations
export const CREATE_SERVICE = gql`
  mutation CreateService($input: CreateServiceInput!) {
    createService(input: $input) {
      _id
      title
      description
      featuredImage
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID!, $input: UpdateServiceInput!) {
    updateService(id: $id, input: $input) {
      _id
      title
      description
      featuredImage
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id) {
      _id
      title
    }
  }
`;

// Quote Mutations
export const UPDATE_QUOTE = gql`
  mutation UpdateQuote($id: ID!, $status: String!) {
    updateQuote(id: $id, status: $status) {
      _id
      name
      email
      phone
      details
      image
      status
      createdAt
    }
  }
`;

export const DELETE_QUOTE = gql`
  mutation DeleteQuote($id: ID!) {
    deleteQuote(id: $id) {
      _id
      name
    }
  }
`;

// Brand Mutations
export const CREATE_BRAND = gql`
  mutation CreateBrand($input: CreateBrandInput!) {
    createBrand(input: $input) {
      _id
      name
      image
      description
      createdAt
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($id: ID!, $input: UpdateBrandInput!) {
    updateBrand(id: $id, input: $input) {
      _id
      name
      image
      description
      createdAt
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation DeleteBrand($id: ID!) {
    deleteBrand(id: $id) {
      _id
      name
    }
  }
`;

// Category Mutations
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      _id
      name
      image
      description
      parent {
        _id
        name
      }
      createdAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      _id
      name
      image
      description
      parent {
        _id
        name
      }
      createdAt
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      _id
      name
    }
  }
`;

// SubCategory Mutations
export const CREATE_SUBCATEGORY = gql`
  mutation CreateSubcategory($input: CreateSubcategoryInput!) {
    createSubcategory(input: $input) {
      _id
      name
      image
      description
      parent {
        _id
        name
      }
      createdAt
    }
  }
`;

export const UPDATE_SUBCATEGORY = gql`
  mutation UpdateSubcategory($id: ID!, $input: UpdateSubcategoryInput!) {
    updateSubcategory(id: $id, input: $input) {
      _id
      name
      image
      description
      parent {
        _id
        name
      }
      createdAt
    }
  }
`;

export const DELETE_SUBCATEGORY = gql`
  mutation DeleteSubcategory($id: ID!) {
    deleteSubcategory(id: $id) {
      _id
      name
    }
  }
`; 