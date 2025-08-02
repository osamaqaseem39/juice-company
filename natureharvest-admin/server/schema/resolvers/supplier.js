const Supplier = require('../../models/Supplier');
const SupplierRequest = require('../../models/SupplierRequest');

const supplierResolvers = {
  Query: {
    suppliers: async () => {
      try {
        const suppliers = await Supplier.find();
        return suppliers;
      } catch (error) {
        throw new Error('Failed to fetch suppliers');
      }
    },
    supplier: async (_, { id }) => {
      try {
        const supplier = await Supplier.findById(id);
        if (!supplier) {
          throw new Error('Supplier not found');
        }
        return supplier;
      } catch (error) {
        throw new Error('Failed to fetch supplier');
      }
    },
    suppliersByStatus: async (_, { status }) => {
      try {
        const suppliers = await Supplier.find({ status });
        return suppliers;
      } catch (error) {
        throw new Error('Failed to fetch suppliers by status');
      }
    },
    supplierRequests: async () => {
      try {
        const supplierRequests = await SupplierRequest.find();
        return supplierRequests;
      } catch (error) {
        throw new Error('Failed to fetch supplier requests');
      }
    },
    supplierRequest: async (_, { id }) => {
      try {
        const supplierRequest = await SupplierRequest.findById(id);
        if (!supplierRequest) {
          throw new Error('Supplier request not found');
        }
        return supplierRequest;
      } catch (error) {
        throw new Error('Failed to fetch supplier request');
      }
    }
  },
  Mutation: {
    createSupplier: async (_, { input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, email, phone, address, company, status = 'active' } = input;

        const supplier = new Supplier({
          name,
          email,
          phone,
          address,
          company,
          status
        });

        await supplier.save();
        return supplier;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateSupplier: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, email, phone, address, company, status } = input;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (address) updateData.address = address;
        if (company) updateData.company = company;
        if (status) updateData.status = status;

        const supplier = await Supplier.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );

        if (!supplier) {
          throw new Error('Supplier not found');
        }

        return supplier;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteSupplier: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const supplier = await Supplier.findByIdAndDelete(id);
        if (!supplier) {
          throw new Error('Supplier not found');
        }

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createSupplierRequest: async (_, { input }) => {
      try {
        const { name, email, phone, company, message, status = 'pending' } = input;

        const supplierRequest = new SupplierRequest({
          name,
          email,
          phone,
          company,
          message,
          status
        });

        await supplierRequest.save();
        return supplierRequest;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateSupplierRequest: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, email, phone, company, message, status } = input;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (company) updateData.company = company;
        if (message) updateData.message = message;
        if (status) updateData.status = status;

        const supplierRequest = await SupplierRequest.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );

        if (!supplierRequest) {
          throw new Error('Supplier request not found');
        }

        return supplierRequest;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteSupplierRequest: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const supplierRequest = await SupplierRequest.findByIdAndDelete(id);
        if (!supplierRequest) {
          throw new Error('Supplier request not found');
        }

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = supplierResolvers; 