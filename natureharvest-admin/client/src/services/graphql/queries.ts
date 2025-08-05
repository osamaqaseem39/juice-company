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
      brand {
        _id
        name
      }
      category {
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
      brand {
        _id
        name
      }
      category {
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
      name
      description
      price
      duration
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_SERVICE_BY_ID = gql`
  query GetServiceById($id: ID!) {
    service(id: $id) {
      _id
      name
      description
      price
      duration
      status
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
      image
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
      image
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

export const GET_NESTED_SUBCATEGORIES = gql`
  query GetNestedSubcategories($parentId: ID!) {
    subcategoriesByParent(parentId: $parentId) {
      _id
      name
      image
      description
      parent
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

// E-commerce queries (for future use)
export const GET_ALL_ECOMMERCE_PRODUCTS = gql`
  query GetAllEcommerceProducts {
    ecommerceProducts {
      _id
      name
      slug
      description
      categoryId {
        _id
        name
        slug
      }
      brandId {
        _id
        name
      }
      variants {
        _id
        sku
        price
        compareAtPrice
        quantity
        color
        size
        weight
        images
        isActive
      }
      images
      tags
      rating
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
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_ECOMMERCE_PRODUCT_BY_ID = gql`
  query GetEcommerceProductById($id: ID!) {
    ecommerceProduct(id: $id) {
      _id
      name
      slug
      description
      categoryId {
        _id
        name
        slug
      }
      brandId {
        _id
        name
      }
      variants {
        _id
        sku
        price
        compareAtPrice
        quantity
        color
        size
        weight
        images
        isActive
      }
      images
      tags
      rating
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
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_CART = gql`
  query GetCart($userId: ID!) {
    cart(userId: $userId) {
      _id
      userId
      items {
        _id
        productId {
          _id
          name
          images
        }
        quantity
        price
        variantId {
          _id
          sku
          color
          size
        }
      }
      totalValue
      totalItems
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    orders {
      _id
      userId {
        _id
        fullName
        email
      }
      orderNumber
      items {
        _id
        productId {
          _id
          name
          images
        }
        quantity
        price
        variantId {
          _id
          sku
          color
          size
        }
      }
      shippingAddress {
        fullName
        phone
        street
        city
        state
        postalCode
        country
      }
      billingAddress {
        fullName
        phone
        street
        city
        state
        postalCode
        country
      }
      totalAmount
      paymentStatus
      orderStatus
      shippingMethod
      paymentMethod
      trackingNumber
      placedAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    order(id: $id) {
      _id
      userId {
        _id
        fullName
        email
      }
      orderNumber
      items {
        _id
        productId {
          _id
          name
          images
        }
        quantity
        price
        variantId {
          _id
          sku
          color
          size
        }
      }
      shippingAddress {
        fullName
        phone
        street
        city
        state
        postalCode
        country
      }
      billingAddress {
        fullName
        phone
        street
        city
        state
        postalCode
        country
      }
      totalAmount
      paymentStatus
      orderStatus
      shippingMethod
      paymentMethod
      trackingNumber
      placedAt
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

export const GET_ALL_COUPONS = gql`
  query GetAllCoupons {
    coupons {
      _id
      code
      discountType
      value
      minOrderValue
      maxDiscountAmount
      expiryDate
      isActive
      usedBy
      createdAt
      updatedAt
    }
  }
`;

export const GET_COUPON_BY_ID = gql`
  query GetCouponById($id: ID!) {
    coupon(id: $id) {
      _id
      code
      discountType
      value
      minOrderValue
      maxDiscountAmount
      expiryDate
      isActive
      usedBy
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

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    companies {
      _id
      name
      description
      logoUrl
      website
      contactEmail
      contactPhone
      address {
        street
        city
        state
        zip
        country
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
  query GetCompanyById($id: ID!) {
    company(id: $id) {
      _id
      name
      description
      logoUrl
      website
      contactEmail
      contactPhone
      address {
        street
        city
        state
        zip
        country
      }
      status
      createdAt
      updatedAt
    }
  }
`; 