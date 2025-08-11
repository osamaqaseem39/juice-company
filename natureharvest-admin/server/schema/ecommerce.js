const { gql } = require('graphql-tag');

const ecommerceSchema = gql`
  # ------------------------
  # Common Types
  # ------------------------
  scalar Date

  type SEO {
    title: String
    description: String
    keywords: [String]
    slug: String
    canonicalUrl: String
    ogImage: String
    noIndex: Boolean
    noFollow: Boolean
  }

  # ------------------------
  # User & Address
  # ------------------------
  type UserAddress {
    _id: ID!
    fullName: String!
    phone: String!
    street: String!
    city: String!
    state: String
    postalCode: String!
    country: String!
    isDefault: Boolean
  }



  # ------------------------
  # Category & Brand
  # ------------------------
  type Category {
    _id: ID!
    name: String!
    slug: String!
    parentCategoryId: ID
    description: String
    imageUrl: String
    seo: SEO
    isActive: Boolean
    createdAt: Date
  }

  type Brand {
    _id: ID!
    name: String!
    description: String
    logoUrl: String
    website: String
    seo: SEO
    isActive: Boolean
  }

  # ------------------------
  # Product & Variants
  # ------------------------
  type ProductVariant {
    _id: ID!
    sku: String!
    price: Float!
    compareAtPrice: Float
    quantity: Int!
    color: String
    size: String
    weight: Float
    images: [String]
    isActive: Boolean
  }

  type Product {
    _id: ID!
    name: String!
    slug: String!
    description: String!
    categoryId: ID!
    brandId: ID
    variants: [ProductVariant!]!
    images: [String!]!
    tags: [String]
    rating: Float
    seo: SEO
    isActive: Boolean
    createdAt: Date
    updatedAt: Date
  }

  # ------------------------
  # Cart & Wishlist
  # ------------------------
  type CartItem {
    productId: ID!
    variantId: ID!
    quantity: Int!
    priceAtTime: Float!
  }

  type Cart {
    _id: ID!
    userId: ID!
    items: [CartItem!]!
    updatedAt: Date
  }

  type Wishlist {
    _id: ID!
    userId: ID!
    productIds: [ID!]!
    createdAt: Date
  }

  # ------------------------
  # Orders & Payments
  # ------------------------
  type OrderItem {
    productId: ID!
    variantId: ID!
    name: String!
    sku: String!
    price: Float!
    quantity: Int!
    imageUrl: String
  }

  type Order {
    _id: ID!
    userId: ID!
    orderNumber: String!
    items: [OrderItem!]!
    shippingAddress: UserAddress!
    billingAddress: UserAddress!
    totalAmount: Float!
    paymentStatus: String!
    orderStatus: String!
    shippingMethod: String!
    paymentMethod: String!
    trackingNumber: String
    placedAt: Date!
    updatedAt: Date
  }

  type Payment {
    _id: ID!
    orderId: ID!
    userId: ID!
    paymentMethod: String!
    status: String!
    transactionId: String
    paidAmount: Float!
    paidAt: Date
  }

  # ------------------------
  # Shipping
  # ------------------------
  type Shipment {
    _id: ID!
    orderId: ID!
    carrier: String!
    trackingNumber: String!
    shippedAt: Date!
    estimatedDeliveryDate: Date
    deliveredAt: Date
    status: String!
  }

  # ------------------------
  # Reviews
  # ------------------------
  type Review {
    _id: ID!
    userId: ID!
    productId: ID!
    rating: Int!
    comment: String!
    images: [String]
    createdAt: Date
    updatedAt: Date
  }

  # ------------------------
  # Coupons
  # ------------------------
  type Coupon {
    _id: ID!
    code: String!
    discountType: String!  # 'percentage' | 'fixed'
    value: Float!
    minOrderValue: Float
    maxDiscountAmount: Float
    expiryDate: Date
    isActive: Boolean
    usedBy: [ID!]!
  }

  # ------------------------
  # Pages (for CMS-like content)
  # ------------------------
  type Page {
    _id: ID!
    title: String!
    content: String!
    slug: String!
    seo: SEO
    isPublished: Boolean
    publishedAt: Date
  }

  # ------------------------
  # Global SEO Settings
  # ------------------------
  type GlobalSEOSettings {
    _id: ID!
    siteName: String!
    defaultTitle: String
    defaultDescription: String
    defaultOgImage: String
    twitterHandle: String
    fbAppId: String
    googleAnalyticsId: String
    defaultCanonicalUrl: String
  }

  # ------------------------
  # Input Types
  # ------------------------
  input SEOInput {
    title: String
    description: String
    keywords: [String]
    slug: String
    canonicalUrl: String
    ogImage: String
    noIndex: Boolean
    noFollow: Boolean
  }

  input UserAddressInput {
    fullName: String!
    phone: String!
    street: String!
    city: String!
    state: String
    postalCode: String!
    country: String!
    isDefault: Boolean
  }

  input UserInput {
    fullName: String!
    email: String!
    password: String!
    phone: String
    roles: [String!]!
    addresses: [UserAddressInput]
    isActive: Boolean
  }

  input CategoryInput {
    name: String!
    slug: String!
    parentCategoryId: ID
    description: String
    imageUrl: String
    seo: SEOInput
    isActive: Boolean
  }

  input BrandInput {
    name: String!
    description: String
    logoUrl: String
    website: String
    seo: SEOInput
    isActive: Boolean
  }

  input ProductVariantInput {
    sku: String!
    price: Float!
    compareAtPrice: Float
    quantity: Int!
    color: String
    size: String
    weight: Float
    images: [String]
    isActive: Boolean
  }

  input ProductInput {
    name: String!
    slug: String!
    description: String!
    categoryId: ID!
    brandId: ID
    variants: [ProductVariantInput!]!
    images: [String!]!
    tags: [String]
    seo: SEOInput
    isActive: Boolean
  }

  input CartItemInput {
    productId: ID!
    variantId: ID!
    quantity: Int!
    priceAtTime: Float!
  }

  input OrderItemInput {
    productId: ID!
    variantId: ID!
    name: String!
    sku: String!
    price: Float!
    quantity: Int!
    imageUrl: String
  }

  input OrderInput {
    userId: ID!
    orderNumber: String!
    items: [OrderItemInput!]!
    shippingAddress: UserAddressInput!
    billingAddress: UserAddressInput!
    totalAmount: Float!
    paymentStatus: String!
    orderStatus: String!
    shippingMethod: String!
    paymentMethod: String!
    trackingNumber: String
  }

  input PaymentInput {
    orderId: ID!
    userId: ID!
    paymentMethod: String!
    status: String!
    transactionId: String
    paidAmount: Float!
  }

  input ShipmentInput {
    orderId: ID!
    carrier: String!
    trackingNumber: String!
    shippedAt: Date!
    estimatedDeliveryDate: Date
    deliveredAt: Date
    status: String!
  }

  input ReviewInput {
    userId: ID!
    productId: ID!
    rating: Int!
    comment: String!
    images: [String]
  }

  input CouponInput {
    code: String!
    discountType: String!
    value: Float!
    minOrderValue: Float
    maxDiscountAmount: Float
    expiryDate: Date
    isActive: Boolean
  }

  input PageInput {
    title: String!
    content: String!
    slug: String!
    seo: SEOInput
    isPublished: Boolean
  }

  input GlobalSEOSettingsInput {
    siteName: String!
    defaultTitle: String
    defaultDescription: String
    defaultOgImage: String
    twitterHandle: String
    fbAppId: String
    googleAnalyticsId: String
    defaultCanonicalUrl: String
  }

  # ------------------------
  # Queries
  # ------------------------
  extend type Query {
    # User queries
    users: [User!]!
    user(id: ID!): User
    me: User

    # Category queries
    categories: [Category!]!
    category(id: ID!): Category
    categoryBySlug(slug: String!): Category

    # Brand queries
    brands: [Brand!]!
    brand(id: ID!): Brand

    # Product queries
    products: [Product!]!
    product(id: ID!): Product
    productBySlug(slug: String!): Product
    productsByCategory(categoryId: ID!): [Product!]!
    productsByBrand(brandId: ID!): [Product!]!
    searchProducts(query: String!): [Product!]!

    # Cart queries
    cart(userId: ID!): Cart

    # Wishlist queries
    wishlist(userId: ID!): Wishlist

    # Order queries
    orders: [Order!]!
    order(id: ID!): Order
    ordersByUser(userId: ID!): [Order!]!
    orderByNumber(orderNumber: String!): Order

    # Payment queries
    payments: [Payment!]!
    payment(id: ID!): Payment
    paymentsByOrder(orderId: ID!): [Payment!]!

    # Shipment queries
    shipments: [Shipment!]!
    shipment(id: ID!): Shipment
    shipmentsByOrder(orderId: ID!): [Shipment!]!

    # Review queries
    reviews: [Review!]!
    review(id: ID!): Review
    reviewsByProduct(productId: ID!): [Review!]!
    reviewsByUser(userId: ID!): [Review!]!

    # Coupon queries
    coupons: [Coupon!]!
    coupon(id: ID!): Coupon
    couponByCode(code: String!): Coupon

    # Page queries
    pages: [Page!]!
    page(id: ID!): Page
    pageBySlug(slug: String!): Page

    # Global SEO Settings
    globalSEOSettings: GlobalSEOSettings
  }

  # ------------------------
  # Mutations
  # ------------------------
  extend type Mutation {
    # User mutations
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean!

    # Category mutations
    createCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!

    # Brand mutations
    createBrand(input: BrandInput!): Brand!
    updateBrand(id: ID!, input: BrandInput!): Brand!
    deleteBrand(id: ID!): Boolean!

    # Product mutations
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Boolean!

    # Cart mutations
    addToCart(userId: ID!, item: CartItemInput!): Cart!
    removeFromCart(userId: ID!, productId: ID!, variantId: ID!): Cart!
    updateCartItem(userId: ID!, productId: ID!, variantId: ID!, quantity: Int!): Cart!
    clearCart(userId: ID!): Cart!

    # Wishlist mutations
    addToWishlist(userId: ID!, productId: ID!): Wishlist!
    removeFromWishlist(userId: ID!, productId: ID!): Wishlist!
    clearWishlist(userId: ID!): Wishlist!

    # Order mutations
    createOrder(input: OrderInput!): Order!
    updateOrder(id: ID!, input: OrderInput!): Order!
    deleteOrder(id: ID!): Boolean!
    updateOrderStatus(id: ID!, status: String!): Order!

    # Payment mutations
    createPayment(input: PaymentInput!): Payment!
    updatePayment(id: ID!, input: PaymentInput!): Payment!
    deletePayment(id: ID!): Boolean!

    # Shipment mutations
    createShipment(input: ShipmentInput!): Shipment!
    updateShipment(id: ID!, input: ShipmentInput!): Shipment!
    deleteShipment(id: ID!): Boolean!

    # Review mutations
    createReview(input: ReviewInput!): Review!
    updateReview(id: ID!, input: ReviewInput!): Review!
    deleteReview(id: ID!): Boolean!

    # Coupon mutations
    createCoupon(input: CouponInput!): Coupon!
    updateCoupon(id: ID!, input: CouponInput!): Coupon!
    deleteCoupon(id: ID!): Boolean!
    applyCoupon(code: String!, userId: ID!): Coupon!

    # Page mutations
    createPage(input: PageInput!): Page!
    updatePage(id: ID!, input: PageInput!): Page!
    deletePage(id: ID!): Boolean!

    # Global SEO Settings mutations
    updateGlobalSEOSettings(input: GlobalSEOSettingsInput!): GlobalSEOSettings!
  }
`;

module.exports = ecommerceSchema; 