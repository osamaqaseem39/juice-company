import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Blog, useBlogs, useDeleteBlog } from '../../services/api';
import { Modal } from '../../components/ui/modal';
import PageMeta from '../../components/common/PageMeta';

const BlogList: React.FC = () => {
  const { data, loading, error, refetch } = useBlogs();
  const [deleteBlog] = useDeleteBlog();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'title' | ''>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const blogs = data?.blogs || [];

  const handleDelete = async (_id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog({ variables: { id: _id } });
        refetch(); // Refetch the data after deletion
      } catch (err) {
        console.error('Error deleting blog:', err);
      }
    }
  };

  const openModal = (img: string) => {
    setModalImg(img.replace('server/', ''));
    setModalOpen(true);
  };

  // Search and sort logic
  const filtered = blogs.filter((b: Blog) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a: Blog, b: Blog) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const handleSort = (key: 'title') => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-logo-red">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Blog Posts | Nature Harvest Admin"
        description="Manage your blog posts"
      />
      <div className="w-full">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-64 text-gray-700 focus:ring-2 focus:ring-logo-red focus:border-logo-red"
              />
              <Link
                to="/blog/add"
                className="bg-logo-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                Add New Post
              </Link>
            </div>
          </div>

          {sorted.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Image</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleSort('title')}>
                      Title {sortKey === 'title' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Author</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Created</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((blog) => (
                    <tr key={blog._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        {blog.featuredImage ? (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-12 h-12 object-cover rounded cursor-pointer"
                            onClick={() => openModal(blog.featuredImage!)}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="font-medium text-gray-900">{blog.title}</div>
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        {blog.author}
                      </td>
                      <td className="px-4 py-2 border">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          blog.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/blog/${blog._id}`}
                            className="text-logo-red hover:text-red-800"
                            title="View"
                          >
                            View
                          </Link>
                          <Link
                            to={`/blog/edit/${blog._id}`}
                            className="text-green-600 hover:text-green-800"
                            title="Edit"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 text-gray-500">
              No blogs found.
            </div>
          )}
        </div>

        {/* Image Modal */}
        {modalOpen && modalImg && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="p-4">
              <img
                src={modalImg}
                alt="Blog"
                className="max-w-full max-h-96 object-contain"
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default BlogList; 