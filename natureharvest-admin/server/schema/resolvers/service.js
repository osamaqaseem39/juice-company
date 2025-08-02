const Service = require('../../models/Service');

const serviceResolvers = {
  Query: {
    services: async () => {
      try {
        const services = await Service.find();
        return services;
      } catch (error) {
        throw new Error('Failed to fetch services');
      }
    },
    service: async (_, { id }) => {
      try {
        const service = await Service.findById(id);
        if (!service) {
          throw new Error('Service not found');
        }
        return service;
      } catch (error) {
        throw new Error('Failed to fetch service');
      }
    },
    servicesByStatus: async (_, { status }) => {
      try {
        const services = await Service.find({ status });
        return services;
      } catch (error) {
        throw new Error('Failed to fetch services by status');
      }
    }
  },
  Mutation: {
    createService: async (_, { input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, description, price, duration, status = 'active' } = input;

        const service = new Service({
          name,
          description,
          price,
          duration,
          status
        });

        await service.save();
        return service;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateService: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, description, price, duration, status } = input;
        const updateData = {};

        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (duration) updateData.duration = duration;
        if (status) updateData.status = status;

        const service = await Service.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );

        if (!service) {
          throw new Error('Service not found');
        }

        return service;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteService: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const service = await Service.findByIdAndDelete(id);
        if (!service) {
          throw new Error('Service not found');
        }

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = serviceResolvers; 