const Size = require('../../models/Size');

const sizeResolvers = {
  Query: {
    sizes: async (_, { search, status, isAvailable, sort, limit = 10, offset = 0 }, { user }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        let query = {};

        // Search functionality
        if (search) {
          query.$text = { $search: search };
        }

        // Status filter
        if (status) {
          query.status = status;
        }

        // Availability filter
        if (isAvailable !== undefined) {
          query.isAvailable = isAvailable;
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
            case 'price_asc':
              sortObj = { price: 1 };
              break;
            case 'price_desc':
              sortObj = { price: -1 };
              break;
            case 'weight_asc':
              sortObj = { weight: 1 };
              break;
            case 'weight_desc':
              sortObj = { weight: -1 };
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

        const sizes = await Size.find(query)
          .sort(sortObj)
          .limit(limit)
          .skip(offset);

        return sizes;
      } catch (error) {
        console.error('Error fetching sizes:', error);
        throw new Error('Failed to fetch sizes');
      }
    },

    size: async (_, { id }, { user }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const size = await Size.findById(id);
        if (!size) {
          throw new Error('Size not found');
        }

        return size;
      } catch (error) {
        console.error('Error fetching size:', error);
        throw new Error('Failed to fetch size');
      }
    },

    sizesByStatus: async (_, { status }, { user }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const sizes = await Size.find({ status });
        return sizes;
      } catch (error) {
        console.error('Error fetching sizes by status:', error);
        throw new Error('Failed to fetch sizes by status');
      }
    },

    availableSizes: async (_, args, { user }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const sizes = await Size.find({ isAvailable: true, status: 'active' });
        return sizes;
      } catch (error) {
        console.error('Error fetching available sizes:', error);
        throw new Error('Failed to fetch available sizes');
      }
    }
  },

  Mutation: {
    createSize: async (_, { input }, { user }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const size = new Size(input);
        await size.save();

        return size;
      } catch (error) {
        console.error('Error creating size:', error);
        if (error.code === 11000) {
          throw new Error('Size name already exists');
        }
        throw new Error('Failed to create size');
      }
    },

    updateSize: async (_, { id, input }, { user }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const size = await Size.findByIdAndUpdate(
          id,
          { ...input },
          { new: true, runValidators: true }
        );

        if (!size) {
          throw new Error('Size not found');
        }

        return size;
      } catch (error) {
        console.error('Error updating size:', error);
        if (error.code === 11000) {
          throw new Error('Size name already exists');
        }
        throw new Error('Failed to update size');
      }
    },

    deleteSize: async (_, { id }, { user }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const size = await Size.findByIdAndDelete(id);
        if (!size) {
          throw new Error('Size not found');
        }

        return true;
      } catch (error) {
        console.error('Error deleting size:', error);
        throw new Error('Failed to delete size');
      }
    }
  }
};

module.exports = sizeResolvers; 