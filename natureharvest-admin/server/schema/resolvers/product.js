const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Brand = require('../../models/Brand');

const productResolvers = {
  Query: {
    products: async () => {
      try {
        const products = await Product.find()
          .populate('categoryId')
          .populate('brandId');
        return products;
      } catch (error) {
        throw new Error('Failed to fetch products');
      }
    },
    product: async (_, { id }) => {
      try {
        const product = await Product.findById(id)
          .populate('categoryId')
          .populate('brandId');
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
        const products = await Product.find({ categoryId })
          .populate('categoryId')
          .populate('brandId');
        return products;
      } catch (error) {
        throw new Error('Failed to fetch products by category');
      }
    },
    productsByBrand: async (_, { brandId }) => {
      try {
        const products = await Product.find({ brandId })
          .populate('categoryId')
          .populate('brandId');
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

        const { name, slug, description, categoryId, brandId, images, tags, rating, seo, isActive = true } = input;

        const product = new Product({
          name,
          slug,
          description,
          categoryId,
          brandId,
          images,
          tags,
          rating,
          seo,
          isActive
        });

        await product.save();
        return product.populate('categoryId').populate('brandId');
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateProduct: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, slug, description, categoryId, brandId, images, tags, rating, seo, isActive } = input;
        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (slug !== undefined) updateData.slug = slug;
        if (description !== undefined) updateData.description = description;
        if (categoryId !== undefined) updateData.categoryId = categoryId;
        if (brandId !== undefined) updateData.brandId = brandId;
        if (images !== undefined) updateData.images = images;
        if (tags !== undefined) updateData.tags = tags;
        if (rating !== undefined) updateData.rating = rating;
        if (seo !== undefined) updateData.seo = seo;
        if (isActive !== undefined) updateData.isActive = isActive;

        const product = await Product.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        ).populate('categoryId').populate('brandId');

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