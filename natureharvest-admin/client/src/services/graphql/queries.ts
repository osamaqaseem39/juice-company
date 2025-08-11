import { gql } from '@apollo/client';

export const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    blogs {
      _id
      title
      content
      author
      featuredImage
      tags
      status
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
      author
      featuredImage
      tags
      status
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
      author
      featuredImage
      tags
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      _id
      name
      description
      images
      brandId {
        _id
        name
      }
      categoryId {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      _id
      name
      description
      images
      brandId {
        _id
        name
      }
      categoryId {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_SERVICES = gql`
  query GetAllServices {
    services {
      _id
      title
      description
      featuredImage
      createdAt
      updatedAt
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
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_BRANDS = gql`
  query GetAllBrands {
    brands {
      _id
      name
      logoUrl
      description
      tagline
      category
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_BRAND_BY_ID = gql`
  query GetBrandById($id: ID!) {
    brand(id: $id) {
      _id
      name
      logoUrl
      description
      tagline
      category
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      _id
      name
      image
      description
      status
      createdAt
      updatedAt
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
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_SUBCATEGORIES = gql`
  query GetAllSubcategories {
    subcategories {
      _id
      name
      description
      category {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_SUBCATEGORY_BY_ID = gql`
  query GetSubcategoryById($id: ID!) {
    subcategory(id: $id) {
      _id
      name
      description
      category {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_SUBCATEGORIES_BY_CATEGORY = gql`
  query GetSubcategoriesByCategory($categoryId: ID!) {
    subcategoriesByCategory(categoryId: $categoryId) {
      _id
      name
      description
      category {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

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
      updatedAt
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
      updatedAt
    }
  }
`;

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
      updatedAt
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
      updatedAt
    }
  }
`;





export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      _id
      fullName
      email
      phone
      roles
      addresses {
        _id
        fullName
        phone
        street
        city
        state
        postalCode
        country
        isDefault
      }
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      _id
      fullName
      email
      phone
      roles
      isActive
      createdAt
      updatedAt
    }
  }
`;



export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages {
      _id
      title
      content
      slug
      seo {
        title
        description
        keywords
        slug
        canonicalUrl
        ogImage
        noIndex
        noFollow
      }
      isPublished
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_PAGE_BY_ID = gql`
  query GetPageById($id: ID!) {
    page(id: $id) {
      _id
      title
      content
      slug
      seo {
        title
        description
        keywords
        slug
        canonicalUrl
        ogImage
        noIndex
        noFollow
      }
      isPublished
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_GLOBAL_SEO_SETTINGS = gql`
  query GetGlobalSEOSettings {
    globalSEOSettings {
      _id
      siteName
      defaultTitle
      defaultDescription
      defaultOgImage
      twitterHandle
      fbAppId
      googleAnalyticsId
      defaultCanonicalUrl
      createdAt
      updatedAt
    }
  }
`;



// Flavor queries
export const GET_ALL_FLAVORS = gql`
  query GetAllFlavors {
    flavors {
      _id
      name
      description
      flavorProfile
      nutritionalInfo {
        calories
        protein
        carbs
        fat
        fiber
        sugar
        vitaminC
        potassium
      }
      sizes {
        _id
        sizeLabel
        price
        imageUrl
        stock
        barcode
        weight
        dimensions {
          height
          width
          depth
        }
        isAvailable
      }
      seasonality {
        startMonth
        endMonth
      }
      brand {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_FLAVOR_BY_ID = gql`
  query GetFlavorById($id: ID!) {
    flavor(id: $id) {
      _id
      name
      description
      flavorProfile
      nutritionalInfo {
        calories
        protein
        carbs
        fat
        fiber
        sugar
        vitaminC
        potassium
      }
      sizes {
        _id
        sizeLabel
        price
        imageUrl
        stock
        barcode
        weight
        dimensions {
          height
          width
          depth
        }
        isAvailable
      }
      seasonality {
        startMonth
        endMonth
      }
      brand {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_FLAVORS_BY_BRAND = gql`
  query GetFlavorByBrand($brandId: ID!) {
    flavorsByBrand(brandId: $brandId) {
      _id
      name
      description
      flavorProfile
      nutritionalInfo {
        calories
        protein
        carbs
        fat
        fiber
        sugar
        vitaminC
        potassium
      }
      sizes {
        _id
        sizeLabel
        price
        imageUrl
        stock
        barcode
        weight
        dimensions {
          height
          width
          depth
        }
        isAvailable
      }
      seasonality {
        startMonth
        endMonth
      }
      brand {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

// Note: Sizes are embedded within flavors in this schema
// Use flavor queries to access size information 

// Size queries
export const GET_ALL_SIZES = gql`
  query GetAllSizes($search: String, $status: String, $isAvailable: Boolean, $sort: String, $limit: Int, $offset: Int) {
    sizes(search: $search, status: $status, isAvailable: $isAvailable, sort: $sort, limit: $limit, offset: $offset) {
      _id
      name
      description
      imageUrl
      price
      weight
      dimensions {
        height
        width
        depth
      }
      isAvailable
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_SIZE_BY_ID = gql`
  query GetSizeById($id: ID!) {
    size(id: $id) {
      _id
      name
      description
      imageUrl
      price
      weight
      dimensions {
        height
        width
        depth
      }
      isAvailable
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_AVAILABLE_SIZES = gql`
  query GetAvailableSizes {
    availableSizes {
      _id
      name
      description
      imageUrl
      price
      weight
      dimensions {
        height
        width
        depth
      }
      isAvailable
      status
    }
  }
`;