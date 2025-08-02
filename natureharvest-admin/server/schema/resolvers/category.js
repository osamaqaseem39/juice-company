const Category = require('../../models/Category');
const SubCategory = require('../../models/SubCategory');

const categoryResolvers = {
  Query: {
    categories: async () => {
      try {
        const categories = await Category.find();
        return categories;
      } catch (error) {
        throw new Error('Failed to fetch categories');
      }
    },
    category: async (_, { id }) => {
      try {
        const category = await Category.findById(id);
        if (!category) {
          throw new Error('Category not found');
        }
        return category;
      } catch (error) {
        throw new Error('Failed to fetch category');
      }
    },
    categoriesByStatus: async (_, { status }) => {
      try {
        const categories = await Category.find({ status });
        return categories;
      } catch (error) {
        throw new Error('Failed to fetch categories by status');
      }
    },
    subcategories: async () => {
      try {
        const subcategories = await SubCategory.find().populate('category');
        return subcategories;
      } catch (error) {
        throw new Error('Failed to fetch subcategories');
      }
    },
    subcategory: async (_, { id }) => {
      try {
        const subcategory = await SubCategory.findById(id).populate('category');
        if (!subcategory) {
          throw new Error('SubCategory not found');
        }
        return subcategory;
      } catch (error) {
        throw new Error('Failed to fetch subcategory');
      }
    },
    subcategoriesByCategory: async (_, { categoryId }) => {
      try {
        const subcategories = await SubCategory.find({ category: categoryId }).populate('category');
        return subcategories;
      } catch (error) {
        throw new Error('Failed to fetch subcategories by category');
      }
    }
  },
  Category: {
    subcategories: async (parent) => {
      try {
        const subcategories = await SubCategory.find({ category: parent._id });
        return subcategories;
      } catch (error) {
        throw new Error('Failed to fetch subcategories');
      }
    }
  },
  Mutation: {
    createCategory: async (_, { input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, description, image, status = 'active' } = input;

        const category = new Category({
          name,
          description,
          image,
          status
        });

        await category.save();
        return category;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateCategory: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, description, image, status } = input;
        const updateData = {};

        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (image) updateData.image = image;
        if (status) updateData.status = status;

        const category = await Category.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );

        if (!category) {
          throw new Error('Category not found');
        }

        return category;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteCategory: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
          throw new Error('Category not found');
        }

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createSubCategory: async (_, { input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, description, category, status = 'active' } = input;

        const subcategory = new SubCategory({
          name,
          description,
          category,
          status
        });

        await subcategory.save();
        return subcategory.populate('category');
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateSubCategory: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, description, category, status } = input;
        const updateData = {};

        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (status) updateData.status = status;

        const subcategory = await SubCategory.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        ).populate('category');

        if (!subcategory) {
          throw new Error('SubCategory not found');
        }

        return subcategory;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteSubCategory: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const subcategory = await SubCategory.findByIdAndDelete(id);
        if (!subcategory) {
          throw new Error('SubCategory not found');
        }

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = categoryResolvers; 