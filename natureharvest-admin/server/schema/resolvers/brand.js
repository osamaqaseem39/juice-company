const Brand = require('../../models/Brand');

const brandResolvers = {
  Query: {
    brands: async (_, { search, category, status, sort, limit = 10, offset = 0 }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        let query = {};

        // Search functionality
        if (search) {
          query.$text = { $search: search };
        }

        // Category filter
        if (category) {
          query.category = category;
        }

        // Status filter
        if (status) {
          query.status = status;
        }

        // Build sort object
        let sortObj = { createdAt: -1 }; // default sort
        if (sort) {
          switch (sort) {
            case 'name_asc':
              sortObj = { name: 1 };
              break;
            case 'name_desc':
              sortObj = { name: -1 };
              break;
            case 'category_asc':
              sortObj = { category: 1 };
              break;
            case 'category_desc':
              sortObj = { category: -1 };
              break;
            case 'createdAt_asc':
              sortObj = { createdAt: 1 };
              break;
            case 'createdAt_desc':
              sortObj = { createdAt: -1 };
              break;
            default:
              sortObj = { createdAt: -1 };
          }
        }

        const brands = await Brand.find(query)
          .sort(sortObj)
          .limit(limit)
          .skip(offset)
          .populate('flavors');

        return brands;
      } catch (error) {
        console.error('Error fetching brands:', error);
        throw new Error('Failed to fetch brands');
      }
    },

    brand: async (_, { id }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const brand = await Brand.findById(id)
          .populate('flavors');
        
        if (!brand) {
          throw new Error('Brand not found');
        }

        return brand;
      } catch (error) {
        console.error('Error fetching brand:', error);
        throw new Error('Failed to fetch brand');
      }
    },



    brandsByCategory: async (_, { category }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const brands = await Brand.find({ category })
          .populate('flavors');
        
        return brands;
      } catch (error) {
        console.error('Error fetching brands by category:', error);
        throw new Error('Failed to fetch brands by category');
      }
    },

    brandsByStatus: async (_, { status }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const brands = await Brand.find({ status })
          .populate('flavors');
        
        return brands;
      } catch (error) {
        console.error('Error fetching brands by status:', error);
        throw new Error('Failed to fetch brands by status');
      }
    }
  },

  Mutation: {
    createBrand: async (_, { input }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const brand = new Brand(input);
        await brand.save();

        return brand;
      } catch (error) {
        console.error('Error creating brand:', error);
        if (error.code === 11000) {
          throw new Error('Brand name already exists');
        }
        throw new Error('Failed to create brand');
      }
    },

    updateBrand: async (_, { id, input }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const brand = await Brand.findByIdAndUpdate(
          id,
          { ...input },
          { new: true, runValidators: true }
        );

        if (!brand) {
          throw new Error('Brand not found');
        }

        return brand;
      } catch (error) {
        console.error('Error updating brand:', error);
        if (error.code === 11000) {
          throw new Error('Brand name already exists');
        }
        throw new Error('Failed to update brand');
      }
    },

    deleteBrand: async (_, { id }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const brand = await Brand.findByIdAndDelete(id);
        if (!brand) {
          throw new Error('Brand not found');
        }

        return true;
      } catch (error) {
        console.error('Error deleting brand:', error);
        throw new Error('Failed to delete brand');
      }
    }
  },

  Brand: {
    flavors: async (parent, args, { user, models }) => {
      try {
        const Flavor = models.Flavor;
        return await Flavor.find({ brandId: parent._id });
      } catch (error) {
        console.error('Error fetching brand flavors:', error);
        return [];
      }
    }
  }
};

module.exports = brandResolvers; 