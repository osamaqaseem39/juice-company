const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Brand = require('../../models/Brand');

const productResolvers = {
  Query: {
    products: async () => {
      try {
        const products = await Product.find()
          .populate('category')
          .populate('brand');
        return products;
      } catch (error) {
        throw new Error('Failed to fetch products');
      }
    },
    product: async (_, { id }) => {
      try {
        const product = await Product.findById(id)
          .populate('category')
          .populate('brand');
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      } catch (error) {
        throw new Error('Failed to fetch product');
      }
    },
    productsByCategory: async (_, { categoryId }) => {
      try {
        const products = await Product.find({ category: categoryId })
          .populate('category')
          .populate('brand');
        return products;
      } catch (error) {
        throw new Error('Failed to fetch products by category');
      }
    },
    productsByBrand: async (_, { brandId }) => {
      try {
        const products = await Product.find({ brand: brandId })
          .populate('category')
          .populate('brand');
        return products;
      } catch (error) {
        throw new Error('Failed to fetch products by brand');
      }
    }
  },
  Mutation: {
    createProduct: async (_, { input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, description, price, category, brand, images, specifications, status = 'active' } = input;

        const product = new Product({
          name,
          description,
          price,
          category,
          brand,
          images,
          specifications,
          status
        });

        await product.save();
        return product.populate('category').populate('brand');
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateProduct: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, description, price, category, brand, images, specifications, status } = input;
        const updateData = {};

        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (category) updateData.category = category;
        if (brand) updateData.brand = brand;
        if (images) updateData.images = images;
        if (specifications) updateData.specifications = specifications;
        if (status) updateData.status = status;

        const product = await Product.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        ).populate('category').populate('brand');

        if (!product) {
          throw new Error('Product not found');
        }

        return product;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteProduct: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
          throw new Error('Product not found');
        }

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = productResolvers; 