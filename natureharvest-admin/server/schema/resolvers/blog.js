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

        console.log('Creating blog with input:', input);
        console.log('User context:', context.user);

        const { title, content, author, featuredImage, tags, status = 'draft' } = input;

        const blog = new Blog({
          title,
          content,
          author: author || context.user.userId,
          featuredImage,
          status,
          tags
        });

        console.log('Blog object before save:', blog);
        await blog.save();
        console.log('Blog saved successfully:', blog._id);
        return blog.populate('author', 'name email');
      } catch (error) {
        console.error('Error creating blog:', error);
        throw new Error(error.message);
      }
    },
    updateBlog: async (_, { id, input }, context) => {
      try {
        if (!context.user) {
          throw new Error('Not authenticated');
        }

        console.log('Updating blog with id:', id);
        console.log('Update input:', input);

        const { title, content, author, featuredImage, tags, status } = input;
        const updateData = {};

        if (title) updateData.title = title;
        if (content) updateData.content = content;
        if (author) updateData.author = author;
        if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
        if (tags) updateData.tags = tags;
        if (status) updateData.status = status;

        console.log('Update data:', updateData);

        const blog = await Blog.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        ).populate('author', 'name email');

        if (!blog) {
          throw new Error('Blog not found');
        }

        console.log('Blog updated successfully:', blog._id);
        return blog;
      } catch (error) {
        console.error('Error updating blog:', error);
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