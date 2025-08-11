const User = require('../../models/User');
const Address = require('../../models/Address');


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





    // Cart queries
    cart: async (_, { userId }) => {
      return await Cart.findOne({ userId })
        .populate('items.productId');
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
        .populate('items.productId');
    },
    order: async (_, { id }) => {
      return await Order.findById(id)
        .populate('userId')
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('items.productId');
    },
    ordersByUser: async (_, { userId }) => {
      return await Order.find({ userId })
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('items.productId');
    },
    orderByNumber: async (_, { orderNumber }) => {
      return await Order.findOne({ orderNumber })
        .populate('userId')
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('items.productId');
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





    // Cart mutations
    addToCart: async (_, { userId, item }) => {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
      
      const existingItemIndex = cart.items.findIndex(
        cartItem => cartItem.productId.toString() === item.productId
      );
      
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        cart.items.push(item);
      }
      
      return await cart.save();
    },
    removeFromCart: async (_, { userId, productId }) => {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error('Cart not found');
      
      cart.items = cart.items.filter(
        item => item.productId.toString() !== productId
      );
      
      return await cart.save();
    },
    updateCartItem: async (_, { userId, productId, quantity }) => {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error('Cart not found');
      
      const item = cart.items.find(
        item => item.productId.toString() === productId
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