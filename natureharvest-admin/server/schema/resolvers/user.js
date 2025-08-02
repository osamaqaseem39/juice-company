const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const userResolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find().select('-password');
        return users;
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id).select('-password');
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    },
    me: async (_, __, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }
        const user = await User.findById(context.user.userId).select('-password');
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error('Failed to fetch current user');
      }
    }
  },
  Mutation: {
    register: async (_, { input }) => {
      try {
        const { name, email, password, role = 'user' } = input;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
          name,
          email,
          password: hashedPassword,
          role
        });

        await user.save();

        // Create JWT token
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );

        return {
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { input }) => {
      try {
        const { email, password } = input;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid credentials');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        // Create JWT token
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );

        return {
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateUser: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { name, email, password, role } = input;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role;

        if (password) {
          const salt = await bcrypt.genSalt(10);
          updateData.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        ).select('-password');

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteUser: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
          throw new Error('User not found');
        }

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = userResolvers; 