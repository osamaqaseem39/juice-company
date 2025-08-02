const Blog = require('../../models/Blog');

const blogResolvers = {
  Query: {
    blogs: async () => {
      try {
        const blogs = await Blog.find().populate('author', 'name email');
        return blogs;
      } catch (error) {
        throw new Error('Failed to fetch blogs');
      }
    },
    blog: async (_, { id }) => {
      try {
        const blog = await Blog.findById(id).populate('author', 'name email');
        if (!blog) {
          throw new Error('Blog not found');
        }
        return blog;
      } catch (error) {
        throw new Error('Failed to fetch blog');
      }
    },
    blogsByStatus: async (_, { status }) => {
      try {
        const blogs = await Blog.find({ status }).populate('author', 'name email');
        return blogs;
      } catch (error) {
        throw new Error('Failed to fetch blogs by status');
      }
    }
  },
  Mutation: {
    createBlog: async (_, { input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { title, content, author, image, tags, status = 'draft' } = input;

        const blog = new Blog({
          title,
          content,
          author: author || context.user.userId,
          featuredImage: image,
          status,
          tags
        });

        await blog.save();
        return blog.populate('author', 'name email');
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateBlog: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const { title, content, author, image, tags, status } = input;
        const updateData = {};

        if (title) updateData.title = title;
        if (content) updateData.content = content;
        if (author) updateData.author = author;
        if (image) updateData.featuredImage = image;
        if (tags) updateData.tags = tags;
        if (status) updateData.status = status;

        const blog = await Blog.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        ).populate('author', 'name email');

        if (!blog) {
          throw new Error('Blog not found');
        }

        return blog;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteBlog: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
          throw new Error('Blog not found');
        }

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = blogResolvers; 