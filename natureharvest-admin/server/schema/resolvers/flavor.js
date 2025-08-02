const Flavor = require('../../models/Flavor');

const flavorResolvers = {
  Query: {
    flavors: async (_, { brandId, search, flavorProfile, status, featured, sort, limit = 10, offset = 0 }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        let query = {};

        // Brand filter
        if (brandId) {
          query.brandId = brandId;
        }

        // Search functionality
        if (search) {
          query.$text = { $search: search };
        }

        // Flavor profile filter
        if (flavorProfile) {
          query.flavorProfile = flavorProfile;
        }

        // Status filter
        if (status) {
          query.status = status;
        }

        // Featured filter
        if (featured !== undefined) {
          query.featured = featured;
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
            case 'flavorProfile_asc':
              sortObj = { flavorProfile: 1 };
              break;
            case 'flavorProfile_desc':
              sortObj = { flavorProfile: -1 };
              break;
            case 'featured_desc':
              sortObj = { featured: -1, createdAt: -1 };
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

        const flavors = await Flavor.find(query)
          .sort(sortObj)
          .limit(limit)
          .skip(offset)
          .populate('brand');

        return flavors;
      } catch (error) {
        console.error('Error fetching flavors:', error);
        throw new Error('Failed to fetch flavors');
      }
    },

    flavor: async (_, { id }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const flavor = await Flavor.findById(id).populate('brand');
        if (!flavor) {
          throw new Error('Flavor not found');
        }

        return flavor;
      } catch (error) {
        console.error('Error fetching flavor:', error);
        throw new Error('Failed to fetch flavor');
      }
    },

    flavorsByBrand: async (_, { brandId }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const flavors = await Flavor.find({ brandId }).populate('brand');
        return flavors;
      } catch (error) {
        console.error('Error fetching flavors by brand:', error);
        throw new Error('Failed to fetch flavors by brand');
      }
    },

    flavorsByProfile: async (_, { flavorProfile }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const flavors = await Flavor.find({ flavorProfile }).populate('brand');
        return flavors;
      } catch (error) {
        console.error('Error fetching flavors by profile:', error);
        throw new Error('Failed to fetch flavors by profile');
      }
    },

    flavorsByStatus: async (_, { status }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const flavors = await Flavor.find({ status }).populate('brand');
        return flavors;
      } catch (error) {
        console.error('Error fetching flavors by status:', error);
        throw new Error('Failed to fetch flavors by status');
      }
    },

    featuredFlavors: async (_, args, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const flavors = await Flavor.find({ featured: true, status: 'active' }).populate('brand');
        return flavors;
      } catch (error) {
        console.error('Error fetching featured flavors:', error);
        throw new Error('Failed to fetch featured flavors');
      }
    },

    seasonalFlavors: async (_, args, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const currentMonth = new Date().getMonth() + 1;
        const flavors = await Flavor.find({
          status: 'active',
          $or: [
            { 'seasonality.startMonth': { $lte: currentMonth }, 'seasonality.endMonth': { $gte: currentMonth } },
            { 'seasonality.startMonth': { $gte: currentMonth }, 'seasonality.endMonth': { $lte: currentMonth } }
          ]
        }).populate('brand');

        return flavors;
      } catch (error) {
        console.error('Error fetching seasonal flavors:', error);
        throw new Error('Failed to fetch seasonal flavors');
      }
    }
  },

  Mutation: {
    createFlavor: async (_, { input }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const flavor = new Flavor(input);
        await flavor.save();

        return flavor.populate('brand');
      } catch (error) {
        console.error('Error creating flavor:', error);
        throw new Error('Failed to create flavor');
      }
    },

    updateFlavor: async (_, { id, input }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const flavor = await Flavor.findByIdAndUpdate(
          id,
          { ...input },
          { new: true, runValidators: true }
        ).populate('brand');

        if (!flavor) {
          throw new Error('Flavor not found');
        }

        return flavor;
      } catch (error) {
        console.error('Error updating flavor:', error);
        throw new Error('Failed to update flavor');
      }
    },

    deleteFlavor: async (_, { id }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const flavor = await Flavor.findByIdAndDelete(id);
        if (!flavor) {
          throw new Error('Flavor not found');
        }

        return true;
      } catch (error) {
        console.error('Error deleting flavor:', error);
        throw new Error('Failed to delete flavor');
      }
    },

    addSizeToFlavor: async (_, { flavorId, size }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const flavor = await Flavor.findByIdAndUpdate(
          flavorId,
          { $push: { sizes: size } },
          { new: true, runValidators: true }
        ).populate('brand');

        if (!flavor) {
          throw new Error('Flavor not found');
        }

        return flavor;
      } catch (error) {
        console.error('Error adding size to flavor:', error);
        throw new Error('Failed to add size to flavor');
      }
    },

    updateSizeInFlavor: async (_, { flavorId, sizeId, size }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const flavor = await Flavor.findByIdAndUpdate(
          flavorId,
          { $set: { 'sizes.$[elem]': size } },
          { 
            new: true, 
            runValidators: true,
            arrayFilters: [{ 'elem._id': sizeId }]
          }
        ).populate('brand');

        if (!flavor) {
          throw new Error('Flavor not found');
        }

        return flavor;
      } catch (error) {
        console.error('Error updating size in flavor:', error);
        throw new Error('Failed to update size in flavor');
      }
    },

    removeSizeFromFlavor: async (_, { flavorId, sizeId }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const flavor = await Flavor.findByIdAndUpdate(
          flavorId,
          { $pull: { sizes: { _id: sizeId } } },
          { new: true, runValidators: true }
        ).populate('brand');

        if (!flavor) {
          throw new Error('Flavor not found');
        }

        return flavor;
      } catch (error) {
        console.error('Error removing size from flavor:', error);
        throw new Error('Failed to remove size from flavor');
      }
    }
  },

  Flavor: {
    brand: async (parent, args, { user, models }) => {
      try {
        const Brand = models.Brand;
        return await Brand.findById(parent.brandId);
      } catch (error) {
        console.error('Error fetching flavor brand:', error);
        return null;
      }
    },

    sizes: async (parent, { sort }, { user, models }) => {
      try {
        let sizes = parent.sizes || [];
        
        // Sort sizes if requested
        if (sort) {
          switch (sort) {
            case 'price_asc':
              sizes = sizes.sort((a, b) => a.price - b.price);
              break;
            case 'price_desc':
              sizes = sizes.sort((a, b) => b.price - a.price);
              break;
            case 'size_asc':
              sizes = sizes.sort((a, b) => a.weight - b.weight);
              break;
            case 'size_desc':
              sizes = sizes.sort((a, b) => b.weight - a.weight);
              break;
            default:
              sizes = sizes.sort((a, b) => a.weight - b.weight);
          }
        }

        return sizes;
      } catch (error) {
        console.error('Error sorting flavor sizes:', error);
        return parent.sizes || [];
      }
    }
  }
};

module.exports = flavorResolvers; 