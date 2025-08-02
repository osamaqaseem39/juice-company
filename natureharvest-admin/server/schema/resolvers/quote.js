const Quote = require('../../models/Quote');

const quoteResolvers = {
  Query: {
    quotes: async () => {
      try {
        const quotes = await Quote.find();
        return quotes;
      } catch (error) {
        throw new Error('Failed to fetch quotes');
      }
    },
    quote: async (_, { id }) => {
      try {
        const quote = await Quote.findById(id);
        if (!quote) {
          throw new Error('Quote not found');
        }
        return quote;
      } catch (error) {
        throw new Error('Failed to fetch quote');
      }
    },
    quotesByStatus: async (_, { status }) => {
      try {
        const quotes = await Quote.find({ status });
        return quotes;
      } catch (error) {
        throw new Error('Failed to fetch quotes by status');
      }
    }
  },
  Mutation: {
    createQuote: async (_, { input }) => {
      try {
        const { name, email, phone, details, image, status = 'pending' } = input;

        const quote = new Quote({
          name,
          email,
          phone,
          details,
          image,
          status
        });

        await quote.save();
        
        // TODO: Send email notification here
        // You can integrate with nodemailer or any email service
        
        return quote;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateQuote: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, email, phone, details, image, status } = input;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (details) updateData.details = details;
        if (image) updateData.image = image;
        if (status) updateData.status = status;

        const quote = await Quote.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );

        if (!quote) {
          throw new Error('Quote not found');
        }

        return quote;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteQuote: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const quote = await Quote.findByIdAndDelete(id);
        if (!quote) {
          throw new Error('Quote not found');
        }

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = quoteResolvers; 