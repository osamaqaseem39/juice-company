const User = require('../../models/User');
const Address = require('../../models/Address');
const Category = require('../../models/Category');
const Brand = require('../../models/Brand');
const Product = require('../../models/Product');
const ProductVariant = require('../../models/ProductVariant');
const Cart = require('../../models/Cart');
const Wishlist = require('../../models/Wishlist');
const Order = require('../../models/Order');
const Payment = require('../../models/Payment');
const Shipment = require('../../models/Shipment');
const Review = require('../../models/Review');
const Coupon = require('../../models/Coupon');
const Page = require('../../models/Page');
const GlobalSEOSettings = require('../../models/GlobalSEOSettings');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    // User queries
    users: async () => {
      return await User.find().populate('addresses');
    },
    user: async (_, { id }) => {
      return await User.findById(id).populate('addresses');
    },
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await User.findById(user.id).populate('addresses');
    },

    // Category queries
    categories: async () => {
      return await Category.find({ isActive: true });
    },
    category: async (_, { id }) => {
      return await Category.findById(id);
    },
    categoryBySlug: async (_, { slug }) => {
      return await Category.findOne({ slug, isActive: true });
    },

    // Brand queries
    brands: async () => {
      return await Brand.find({ isActive: true });
    },
    brand: async (_, { id }) => {
      return await Brand.findById(id);
    },

    // Product queries
    products: async () => {
      return await Product.find({ isActive: true })
        .populate('categoryId')
        .populate('brandId')
        .populate('variants');
    },
    product: async (_, { id }) => {
      return await Product.findById(id)
        .populate('categoryId')
        .populate('brandId')
        .populate('variants');
    },
    productBySlug: async (_, { slug }) => {
      return await Product.findOne({ slug, isActive: true })
        .populate('categoryId')
        .populate('brandId')
        .populate('variants');
    },
    productsByCategory: async (_, { categoryId }) => {
      return await Product.find({ categoryId, isActive: true })
        .populate('categoryId')
        .populate('brandId')
        .populate('variants');
    },
    productsByBrand: async (_, { brandId }) => {
      return await Product.find({ brandId, isActive: true })
        .populate('categoryId')
        .populate('brandId')
        .populate('variants');
    },
    searchProducts: async (_, { query }) => {
      return await Product.find({
        $and: [
          { isActive: true },
          {
            $or: [
              { name: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } },
              { tags: { $in: [new RegExp(query, 'i')] } }
            ]
          }
        ]
      })
        .populate('categoryId')
        .populate('brandId')
        .populate('variants');
    },

    // Cart queries
    cart: async (_, { userId }) => {
      return await Cart.findOne({ userId })
        .populate('items.productId')
        .populate('items.variantId');
    },

    // Wishlist queries
    wishlist: async (_, { userId }) => {
      return await Wishlist.findOne({ userId }).populate('products');
    },

    // Order queries
    orders: async () => {
      return await Order.find()
        .populate('userId')
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('items.productId')
        .populate('items.variantId');
    },
    order: async (_, { id }) => {
      return await Order.findById(id)
        .populate('userId')
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('items.productId')
        .populate('items.variantId');
    },
    ordersByUser: async (_, { userId }) => {
      return await Order.find({ userId })
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('items.productId')
        .populate('items.variantId');
    },
    orderByNumber: async (_, { orderNumber }) => {
      return await Order.findOne({ orderNumber })
        .populate('userId')
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('items.productId')
        .populate('items.variantId');
    },

    // Payment queries
    payments: async () => {
      return await Payment.find()
        .populate('orderId')
        .populate('userId');
    },
    payment: async (_, { id }) => {
      return await Payment.findById(id)
        .populate('orderId')
        .populate('userId');
    },
    paymentsByOrder: async (_, { orderId }) => {
      return await Payment.find({ orderId })
        .populate('userId');
    },

    // Shipment queries
    shipments: async () => {
      return await Shipment.find().populate('orderId');
    },
    shipment: async (_, { id }) => {
      return await Shipment.findById(id).populate('orderId');
    },
    shipmentsByOrder: async (_, { orderId }) => {
      return await Shipment.find({ orderId });
    },

    // Review queries
    reviews: async () => {
      return await Review.find()
        .populate('userId')
        .populate('productId');
    },
    review: async (_, { id }) => {
      return await Review.findById(id)
        .populate('userId')
        .populate('productId');
    },
    reviewsByProduct: async (_, { productId }) => {
      return await Review.find({ productId })
        .populate('userId')
        .sort({ createdAt: -1 });
    },
    reviewsByUser: async (_, { userId }) => {
      return await Review.find({ userId })
        .populate('productId')
        .sort({ createdAt: -1 });
    },

    // Coupon queries
    coupons: async () => {
      return await Coupon.find({ isActive: true });
    },
    coupon: async (_, { id }) => {
      return await Coupon.findById(id);
    },
    couponByCode: async (_, { code }) => {
      return await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    },

    // Page queries
    pages: async () => {
      return await Page.find({ isPublished: true });
    },
    page: async (_, { id }) => {
      return await Page.findById(id);
    },
    pageBySlug: async (_, { slug }) => {
      return await Page.findOne({ slug, isPublished: true });
    },

    // Global SEO Settings
    globalSEOSettings: async () => {
      return await GlobalSEOSettings.getInstance();
    }
  },

  Mutation: {
    // User mutations
    createUser: async (_, { input }) => {
      const user = new User(input);
      return await user.save();
    },
    updateUser: async (_, { id, input }) => {
      return await User.findByIdAndUpdate(id, input, { new: true }).populate('addresses');
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return true;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');
      
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) throw new Error('Invalid credentials');
      
      const token = jwt.sign(
        { id: user._id, email: user.email, roles: user.roles },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return { ...user.toJSON(), token };
    },
    register: async (_, { input }) => {
      const existingUser = await User.findOne({ email: input.email });
      if (existingUser) throw new Error('User already exists');
      
      const user = new User(input);
      await user.save();
      
      const token = jwt.sign(
        { id: user._id, email: user.email, roles: user.roles },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return { ...user.toJSON(), token };
    },

    // Category mutations
    createCategory: async (_, { input }) => {
      const category = new Category(input);
      return await category.save();
    },
    updateCategory: async (_, { id, input }) => {
      return await Category.findByIdAndUpdate(id, input, { new: true });
    },
    deleteCategory: async (_, { id }) => {
      await Category.findByIdAndDelete(id);
      return true;
    },

    // Brand mutations
    createBrand: async (_, { input }) => {
      const brand = new Brand(input);
      return await brand.save();
    },
    updateBrand: async (_, { id, input }) => {
      return await Brand.findByIdAndUpdate(id, input, { new: true });
    },
    deleteBrand: async (_, { id }) => {
      await Brand.findByIdAndDelete(id);
      return true;
    },

    // Product mutations
    createProduct: async (_, { input }) => {
      const product = new Product(input);
      return await product.save();
    },
    updateProduct: async (_, { id, input }) => {
      return await Product.findByIdAndUpdate(id, input, { new: true });
    },
    deleteProduct: async (_, { id }) => {
      await Product.findByIdAndDelete(id);
      return true;
    },

    // Cart mutations
    addToCart: async (_, { userId, item }) => {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
      
      const existingItemIndex = cart.items.findIndex(
        cartItem => cartItem.productId.toString() === item.productId && 
                   cartItem.variantId.toString() === item.variantId
      );
      
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        cart.items.push(item);
      }
      
      return await cart.save();
    },
    removeFromCart: async (_, { userId, productId, variantId }) => {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error('Cart not found');
      
      cart.items = cart.items.filter(
        item => !(item.productId.toString() === productId && 
                 item.variantId.toString() === variantId)
      );
      
      return await cart.save();
    },
    updateCartItem: async (_, { userId, productId, variantId, quantity }) => {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error('Cart not found');
      
      const item = cart.items.find(
        item => item.productId.toString() === productId && 
               item.variantId.toString() === variantId
      );
      
      if (!item) throw new Error('Item not found in cart');
      
      item.quantity = quantity;
      return await cart.save();
    },
    clearCart: async (_, { userId }) => {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error('Cart not found');
      
      cart.items = [];
      return await cart.save();
    },

    // Wishlist mutations
    addToWishlist: async (_, { userId, productId }) => {
      let wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) {
        wishlist = new Wishlist({ userId, productIds: [] });
      }
      
      if (!wishlist.productIds.includes(productId)) {
        wishlist.productIds.push(productId);
      }
      
      return await wishlist.save();
    },
    removeFromWishlist: async (_, { userId, productId }) => {
      const wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) throw new Error('Wishlist not found');
      
      wishlist.productIds = wishlist.productIds.filter(
        id => id.toString() !== productId
      );
      
      return await wishlist.save();
    },
    clearWishlist: async (_, { userId }) => {
      const wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) throw new Error('Wishlist not found');
      
      wishlist.productIds = [];
      return await wishlist.save();
    },

    // Order mutations
    createOrder: async (_, { input }) => {
      const order = new Order(input);
      return await order.save();
    },
    updateOrder: async (_, { id, input }) => {
      return await Order.findByIdAndUpdate(id, input, { new: true });
    },
    deleteOrder: async (_, { id }) => {
      await Order.findByIdAndDelete(id);
      return true;
    },
    updateOrderStatus: async (_, { id, status }) => {
      return await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
    },

    // Payment mutations
    createPayment: async (_, { input }) => {
      const payment = new Payment(input);
      return await payment.save();
    },
    updatePayment: async (_, { id, input }) => {
      return await Payment.findByIdAndUpdate(id, input, { new: true });
    },
    deletePayment: async (_, { id }) => {
      await Payment.findByIdAndDelete(id);
      return true;
    },

    // Shipment mutations
    createShipment: async (_, { input }) => {
      const shipment = new Shipment(input);
      return await shipment.save();
    },
    updateShipment: async (_, { id, input }) => {
      return await Shipment.findByIdAndUpdate(id, input, { new: true });
    },
    deleteShipment: async (_, { id }) => {
      await Shipment.findByIdAndDelete(id);
      return true;
    },

    // Review mutations
    createReview: async (_, { input }) => {
      const review = new Review(input);
      return await review.save();
    },
    updateReview: async (_, { id, input }) => {
      return await Review.findByIdAndUpdate(id, input, { new: true });
    },
    deleteReview: async (_, { id }) => {
      await Review.findByIdAndDelete(id);
      return true;
    },

    // Coupon mutations
    createCoupon: async (_, { input }) => {
      const coupon = new Coupon(input);
      return await coupon.save();
    },
    updateCoupon: async (_, { id, input }) => {
      return await Coupon.findByIdAndUpdate(id, input, { new: true });
    },
    deleteCoupon: async (_, { id }) => {
      await Coupon.findByIdAndDelete(id);
      return true;
    },
    applyCoupon: async (_, { code, userId }) => {
      const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
      if (!coupon) throw new Error('Invalid coupon code');
      
      if (!coupon.isValid()) throw new Error('Coupon is not valid');
      if (!coupon.canBeUsedBy(userId)) throw new Error('Coupon already used by this user');
      
      return coupon;
    },

    // Page mutations
    createPage: async (_, { input }) => {
      const page = new Page(input);
      return await page.save();
    },
    updatePage: async (_, { id, input }) => {
      return await Page.findByIdAndUpdate(id, input, { new: true });
    },
    deletePage: async (_, { id }) => {
      await Page.findByIdAndDelete(id);
      return true;
    },

    // Global SEO Settings mutations
    updateGlobalSEOSettings: async (_, { input }) => {
      const settings = await GlobalSEOSettings.getInstance();
      Object.assign(settings, input);
      return await settings.save();
    }
  }
};

module.exports = resolvers; 