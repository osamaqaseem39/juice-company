import { gql } from '@apollo/client';

// Auth Mutations
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        fullName
        email
        phone
        roles
        isActive
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      token
      user {
        _id
        fullName
        email
        phone
        roles
        isActive
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
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

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
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

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// Blog Mutations
export const CREATE_BLOG = gql`
  mutation CreateBlog($input: BlogInput!) {
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
  mutation UpdateBlog($id: ID!, $input: BlogInput!) {
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
    deleteBlog(id: $id)
  }
`;

// Product Mutations
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
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

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
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

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// Category Mutations
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
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
      updatedAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
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
      updatedAt
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

// Brand Mutations
export const CREATE_BRAND = gql`
  mutation CreateBrand($input: BrandInput!) {
    createBrand(input: $input) {
      _id
      name
      image
      description
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($id: ID!, $input: BrandInput!) {
    updateBrand(id: $id, input: $input) {
      _id
      name
      image
      description
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation DeleteBrand($id: ID!) {
    deleteBrand(id: $id)
  }
`;

// Cart Mutations
export const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $item: CartItemInput!) {
    addToCart(userId: $userId, item: $item) {
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

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($userId: ID!, $productId: ID!, $variantId: ID!) {
    removeFromCart(userId: $userId, productId: $productId, variantId: $variantId) {
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

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($userId: ID!, $productId: ID!, $variantId: ID!, $quantity: Int!) {
    updateCartItem(userId: $userId, productId: $productId, variantId: $variantId, quantity: $quantity) {
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

export const CLEAR_CART = gql`
  mutation ClearCart($userId: ID!) {
    clearCart(userId: $userId) {
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

// Wishlist Mutations
export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($userId: ID!, $productId: ID!) {
    addToWishlist(userId: $userId, productId: $productId) {
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

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($userId: ID!, $productId: ID!) {
    removeFromWishlist(userId: $userId, productId: $productId) {
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

export const CLEAR_WISHLIST = gql`
  mutation ClearWishlist($userId: ID!) {
    clearWishlist(userId: $userId) {
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

// Order Mutations
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
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

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $input: OrderInput!) {
    updateOrder(id: $id, input: $input) {
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

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      _id
      orderNumber
      orderStatus
      updatedAt
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

// Review Mutations
export const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
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

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: ReviewInput!) {
    updateReview(id: $id, input: $input) {
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

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

// Coupon Mutations
export const CREATE_COUPON = gql`
  mutation CreateCoupon($input: CouponInput!) {
    createCoupon(input: $input) {
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

export const UPDATE_COUPON = gql`
  mutation UpdateCoupon($id: ID!, $input: CouponInput!) {
    updateCoupon(id: $id, input: $input) {
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

export const DELETE_COUPON = gql`
  mutation DeleteCoupon($id: ID!) {
    deleteCoupon(id: $id)
  }
`;

export const APPLY_COUPON = gql`
  mutation ApplyCoupon($code: String!, $userId: ID!) {
    applyCoupon(code: $code, userId: $userId) {
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

// Page Mutations
export const CREATE_PAGE = gql`
  mutation CreatePage($input: PageInput!) {
    createPage(input: $input) {
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

export const UPDATE_PAGE = gql`
  mutation UpdatePage($id: ID!, $input: PageInput!) {
    updatePage(id: $id, input: $input) {
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

export const DELETE_PAGE = gql`
  mutation DeletePage($id: ID!) {
    deletePage(id: $id)
  }
`;

// Global SEO Settings Mutations
export const UPDATE_GLOBAL_SEO_SETTINGS = gql`
  mutation UpdateGlobalSEOSettings($input: GlobalSEOSettingsInput!) {
    updateGlobalSEOSettings(input: $input) {
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

// Legacy mutations for backward compatibility
export const CREATE_SERVICE = gql`
  mutation CreateService($input: ServiceInput!) {
    createService(input: $input) {
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

export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID!, $input: ServiceInput!) {
    updateService(id: $id, input: $input) {
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

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id)
  }
`;

export const CREATE_QUOTE = gql`
  mutation CreateQuote($input: QuoteInput!) {
    createQuote(input: $input) {
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

export const UPDATE_QUOTE = gql`
  mutation UpdateQuote($id: ID!, $input: QuoteInput!) {
    updateQuote(id: $id, input: $input) {
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

export const DELETE_QUOTE = gql`
  mutation DeleteQuote($id: ID!) {
    deleteQuote(id: $id)
  }
`;

// Legacy subcategory mutations (using categories with parentCategoryId)
export const CREATE_SUBCATEGORY = gql`
  mutation CreateSubcategory($input: CategoryInput!) {
    createCategory(input: $input) {
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

export const UPDATE_SUBCATEGORY = gql`
  mutation UpdateSubcategory($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
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

export const DELETE_SUBCATEGORY = gql`
  mutation DeleteSubcategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

// Company Mutations
export const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
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

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: ID!, $input: CompanyInput!) {
    updateCompany(id: $id, input: $input) {
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

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id)
  }
`;

// Flavor mutations
export const CREATE_FLAVOR = gql`
  mutation CreateFlavor($input: FlavorInput!) {
    createFlavor(input: $input) {
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
        sodium
        vitamins
        minerals
      }
      sizes {
        _id
        sizeLabel
        price
        volume
        availability
      }
      seasonality {
        isSeasonal
        availableMonths
        peakSeason
      }
      brandId {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_FLAVOR = gql`
  mutation UpdateFlavor($id: ID!, $input: FlavorInput!) {
    updateFlavor(id: $id, input: $input) {
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
        sodium
        vitamins
        minerals
      }
      sizes {
        _id
        sizeLabel
        price
        volume
        availability
      }
      seasonality {
        isSeasonal
        availableMonths
        peakSeason
      }
      brandId {
        _id
        name
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_FLAVOR = gql`
  mutation DeleteFlavor($id: ID!) {
    deleteFlavor(id: $id)
  }
`;

export const ADD_SIZE_TO_FLAVOR = gql`
  mutation AddSizeToFlavor($flavorId: ID!, $size: FlavorSizeInput!) {
    addSizeToFlavor(flavorId: $flavorId, size: $size) {
      _id
      name
      sizes {
        _id
        sizeLabel
        price
        volume
        availability
      }
    }
  }
`;

export const UPDATE_SIZE_IN_FLAVOR = gql`
  mutation UpdateSizeInFlavor($flavorId: ID!, $sizeId: ID!, $size: FlavorSizeInput!) {
    updateSizeInFlavor(flavorId: $flavorId, sizeId: $sizeId, size: $size) {
      _id
      name
      sizes {
        _id
        sizeLabel
        price
        volume
        availability
      }
    }
  }
`;

export const REMOVE_SIZE_FROM_FLAVOR = gql`
  mutation RemoveSizeFromFlavor($flavorId: ID!, $sizeId: ID!) {
    removeSizeFromFlavor(flavorId: $flavorId, sizeId: $sizeId) {
      _id
      name
      sizes {
        _id
        sizeLabel
        price
        volume
        availability
      }
    }
  }
`;

// Size mutations
export const CREATE_SIZE = gql`
  mutation CreateSize($input: SizeInput!) {
    createSize(input: $input) {
      _id
      sizeLabel
      price
      volume
      availability
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SIZE = gql`
  mutation UpdateSize($id: ID!, $input: SizeInput!) {
    updateSize(id: $id, input: $input) {
      _id
      sizeLabel
      price
      volume
      availability
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SIZE = gql`
  mutation DeleteSize($id: ID!) {
    deleteSize(id: $id)
  }
`; 