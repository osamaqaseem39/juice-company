import { gql } from '@apollo/client';

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

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
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

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
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

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categoryId: ID!) {
    productsByCategory(categoryId: $categoryId) {
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
      isActive
    }
  }
`;

export const GET_PRODUCTS_BY_BRAND = gql`
  query GetProductsByBrand($brandId: ID!) {
    productsByBrand(brandId: $brandId) {
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
      isActive
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($query: String!) {
    searchProducts(query: $query) {
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
      isActive
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      _id
      name
      slug
      parentCategoryId
      description
      imageUrl
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
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: ID!) {
    category(id: $id) {
      _id
      name
      slug
      parentCategoryId
      description
      imageUrl
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
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    categoryBySlug(slug: $slug) {
      _id
      name
      slug
      parentCategoryId
      description
      imageUrl
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
    }
  }
`;

export const GET_ALL_BRANDS = gql`
  query GetAllBrands {
    brands {
      _id
      name
      description
      logoUrl
      website
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
    }
  }
`;

export const GET_BRAND_BY_ID = gql`
  query GetBrandById($id: ID!) {
    brand(id: $id) {
      _id
      name
      description
      logoUrl
      website
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

export const GET_ME = gql`
  query GetMe {
    me {
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

export const GET_CART = gql`
  query GetCart($userId: ID!) {
    cart(userId: $userId) {
      _id
      userId
      items {
        productId {
          _id
          name
          slug
          images
        }
        variantId {
          _id
          sku
          price
          compareAtPrice
          color
          size
          images
        }
        quantity
        priceAtTime
      }
      updatedAt
    }
  }
`;

export const GET_WISHLIST = gql`
  query GetWishlist($userId: ID!) {
    wishlist(userId: $userId) {
      _id
      userId
      productIds {
        _id
        name
        slug
        images
        rating
      }
      createdAt
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
        productId {
          _id
          name
          slug
          images
        }
        variantId {
          _id
          sku
          color
          size
        }
        name
        sku
        price
        quantity
        imageUrl
      }
      shippingAddress {
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
      billingAddress {
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
      totalAmount
      paymentStatus
      orderStatus
      shippingMethod
      paymentMethod
      trackingNumber
      placedAt
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
        productId {
          _id
          name
          slug
          images
        }
        variantId {
          _id
          sku
          color
          size
        }
        name
        sku
        price
        quantity
        imageUrl
      }
      shippingAddress {
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
      billingAddress {
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
      totalAmount
      paymentStatus
      orderStatus
      shippingMethod
      paymentMethod
      trackingNumber
      placedAt
      updatedAt
    }
  }
`;

export const GET_ORDERS_BY_USER = gql`
  query GetOrdersByUser($userId: ID!) {
    ordersByUser(userId: $userId) {
      _id
      orderNumber
      items {
        productId {
          _id
          name
          slug
          images
        }
        variantId {
          _id
          sku
          color
          size
        }
        name
        sku
        price
        quantity
        imageUrl
      }
      shippingAddress {
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
      billingAddress {
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
      totalAmount
      paymentStatus
      orderStatus
      shippingMethod
      paymentMethod
      trackingNumber
      placedAt
      updatedAt
    }
  }
`;

export const GET_ORDER_BY_NUMBER = gql`
  query GetOrderByNumber($orderNumber: String!) {
    orderByNumber(orderNumber: $orderNumber) {
      _id
      userId {
        _id
        fullName
        email
      }
      orderNumber
      items {
        productId {
          _id
          name
          slug
          images
        }
        variantId {
          _id
          sku
          color
          size
        }
        name
        sku
        price
        quantity
        imageUrl
      }
      shippingAddress {
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
      billingAddress {
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
      totalAmount
      paymentStatus
      orderStatus
      shippingMethod
      paymentMethod
      trackingNumber
      placedAt
      updatedAt
    }
  }
`;

export const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    reviews {
      _id
      userId {
        _id
        fullName
        email
      }
      productId {
        _id
        name
        slug
        images
      }
      rating
      comment
      images
      createdAt
      updatedAt
    }
  }
`;

export const GET_REVIEWS_BY_PRODUCT = gql`
  query GetReviewsByProduct($productId: ID!) {
    reviewsByProduct(productId: $productId) {
      _id
      userId {
        _id
        fullName
        email
      }
      productId {
        _id
        name
        slug
        images
      }
      rating
      comment
      images
      createdAt
      updatedAt
    }
  }
`;

export const GET_REVIEWS_BY_USER = gql`
  query GetReviewsByUser($userId: ID!) {
    reviewsByUser(userId: $userId) {
      _id
      productId {
        _id
        name
        slug
        images
      }
      rating
      comment
      images
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
    }
  }
`;

export const GET_COUPON_BY_CODE = gql`
  query GetCouponByCode($code: String!) {
    couponByCode(code: $code) {
      _id
      code
      discountType
      value
      minOrderValue
      maxDiscountAmount
      expiryDate
      isActive
      usedBy
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
    }
  }
`;

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    pageBySlug(slug: $slug) {
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
    }
  }
`;

// Legacy queries for backward compatibility
export const GET_ALL_SERVICES = gql`
  query GetAllServices {
    services {
      _id
      title
      description
      featuredImage
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
      title
      description
      featuredImage
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
      name
      email
      phone
      address
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_SUPPLIER_BY_ID = gql`
  query GetSupplierById($id: ID!) {
    supplier(id: $id) {
      _id
      name
      email
      phone
      address
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
      message
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
      message
      status
      createdAt
      updatedAt
    }
  }
`;

// Legacy subcategory queries (using categories with parentCategoryId)
export const GET_ALL_SUBCATEGORIES = gql`
  query GetAllSubcategories {
    categories {
      _id
      name
      slug
      parentCategoryId
      description
      imageUrl
      isActive
      createdAt
    }
  }
`;

export const GET_SUBCATEGORY_BY_ID = gql`
  query GetSubcategoryById($id: ID!) {
    category(id: $id) {
      _id
      name
      slug
      parentCategoryId
      description
      imageUrl
      isActive
      createdAt
    }
  }
`;

export const GET_NESTED_SUBCATEGORIES = gql`
  query GetNestedSubcategories($parentId: ID!) {
    categories {
      _id
      name
      slug
      parentCategoryId
      description
      imageUrl
      isActive
      createdAt
    }
  }
`; 