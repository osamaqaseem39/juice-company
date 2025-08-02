const Company = require('../../models/Company');

const companyResolvers = {
  Query: {
    companies: async (_, { search, status, sort, limit = 10, offset = 0 }, { user, models }) => {
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

        const companies = await Company.find(query)
          .sort(sortObj)
          .limit(limit)
          .skip(offset)
          .populate('brands');

        return companies;
      } catch (error) {
        console.error('Error fetching companies:', error);
        throw new Error('Failed to fetch companies');
      }
    },

    company: async (_, { id }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const company = await Company.findById(id).populate('brands');
        if (!company) {
          throw new Error('Company not found');
        }

        return company;
      } catch (error) {
        console.error('Error fetching company:', error);
        throw new Error('Failed to fetch company');
      }
    },

    companiesByStatus: async (_, { status }, { user, models }) => {
      try {
        if (!user) {
          throw new Error('Authentication required');
        }

        const companies = await Company.find({ status }).populate('brands');
        return companies;
      } catch (error) {
        console.error('Error fetching companies by status:', error);
        throw new Error('Failed to fetch companies by status');
      }
    }
  },

  Mutation: {
    createCompany: async (_, { input }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const company = new Company(input);
        await company.save();

        return company;
      } catch (error) {
        console.error('Error creating company:', error);
        if (error.code === 11000) {
          throw new Error('Company name already exists');
        }
        throw new Error('Failed to create company');
      }
    },

    updateCompany: async (_, { id, input }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const company = await Company.findByIdAndUpdate(
          id,
          { ...input },
          { new: true, runValidators: true }
        );

        if (!company) {
          throw new Error('Company not found');
        }

        return company;
      } catch (error) {
        console.error('Error updating company:', error);
        if (error.code === 11000) {
          throw new Error('Company name already exists');
        }
        throw new Error('Failed to update company');
      }
    },

    deleteCompany: async (_, { id }, { user, models }) => {
      try {
        if (!user || user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const company = await Company.findByIdAndDelete(id);
        if (!company) {
          throw new Error('Company not found');
        }

        return true;
      } catch (error) {
        console.error('Error deleting company:', error);
        throw new Error('Failed to delete company');
      }
    }
  },

  Company: {
    brands: async (parent, args, { user, models }) => {
      try {
        const Brand = models.Brand;
        return await Brand.find({ companyId: parent._id });
      } catch (error) {
        console.error('Error fetching company brands:', error);
        return [];
      }
    }
  }
};

module.exports = companyResolvers; 