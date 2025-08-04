import { gql } from '@apollo/client';

// Blog Queries
export const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    blogs {
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

export const GET_BLOG_BY_ID = gql`
  query GetBlogById($id: ID!) {
    blog(id: $id) {
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

export const GET_BLOG_BY_SLUG = gql`
  query GetBlogBySlug($slug: String!) {
    blogBySlug(slug: $slug) {
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

// Product Queries
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
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

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
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

// Service Queries
export const GET_ALL_SERVICES = gql`
  query GetAllServices {
    services {
      _id
      title
      description
      featuredImage
    }
  }
`;

export const GET_SERVICE_BY_ID = gql`
  query GetServiceById($id: ID!) {
    service(id: $id) {
      _id
      title
      description
      featuredImage
    }
  }
`;

// Quote Queries
export const GET_ALL_QUOTES = gql`
  query GetAllQuotes {
    quotes {
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

export const GET_QUOTE_BY_ID = gql`
  query GetQuoteById($id: ID!) {
    quote(id: $id) {
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

// Supplier Queries
export const GET_ALL_SUPPLIERS = gql`
  query GetAllSuppliers {
    suppliers {
      _id
      firstName
      lastName
      email
      phone
      companyName
      jobTitle
      address {
        street
        city
        zip
        country
      }
      ingredientsSupplied
      foodSafetyAccreditations
      brochure
      website
      message
      newsletterSubscribed
      createdAt
    }
  }
`;

export const GET_SUPPLIER_BY_ID = gql`
  query GetSupplierById($id: ID!) {
    supplier(id: $id) {
      _id
      firstName
      lastName
      email
      phone
      companyName
      jobTitle
      address {
        street
        city
        zip
        country
      }
      ingredientsSupplied
      foodSafetyAccreditations
      brochure
      website
      message
      newsletterSubscribed
      createdAt
    }
  }
`;

// Brand Queries
export const GET_ALL_BRANDS = gql`
  query GetAllBrands {
    brands {
      _id
      name
      image
      description
      createdAt
    }
  }
`;

export const GET_BRAND_BY_ID = gql`
  query GetBrandById($id: ID!) {
    brand(id: $id) {
      _id
      name
      image
      description
      createdAt
    }
  }
`;

// Category Queries
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
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

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: ID!) {
    category(id: $id) {
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

// SubCategory Queries
export const GET_ALL_SUBCATEGORIES = gql`
  query GetAllSubcategories {
    subcategories {
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

export const GET_SUBCATEGORY_BY_ID = gql`
  query GetSubcategoryById($id: ID!) {
    subcategory(id: $id) {
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

export const GET_NESTED_SUBCATEGORIES = gql`
  query GetNestedSubcategories($parentId: ID!) {
    nestedSubcategories(parentId: $parentId) {
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