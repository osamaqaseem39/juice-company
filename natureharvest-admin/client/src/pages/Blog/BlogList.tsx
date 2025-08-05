import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Blog, useBlogs, useDeleteBlog } from '../../services/api';
import { Modal } from '../../components/ui/modal';

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
        <div className="text-logo-red font-poppins">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold font-poppins text-logo-black">Blog Posts</h1>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded px-3 py-2 w-full md:w-64 text-logo-black font-poppins focus:ring-2 focus:ring-logo-red focus:border-logo-red"
            />
            <Link
              to="/blog/add"
              className="bg-logo-red text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition font-poppins font-medium"
            >
              Add New Post
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-leaf-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-logo-black uppercase tracking-wider font-poppins">
                  Image
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-logo-black uppercase tracking-wider cursor-pointer hover:bg-leaf-200 font-poppins"
                  onClick={() => handleSort('title')}
                >
                  Title
                  {sortKey === 'title' && (
                    <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-logo-black uppercase tracking-wider font-poppins">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-logo-black uppercase tracking-wider font-poppins">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-logo-black uppercase tracking-wider font-poppins">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-logo-black uppercase tracking-wider font-poppins">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sorted.map((blog) => (
                <tr key={blog._id} className="hover:bg-leaf-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-12 w-12 object-cover rounded cursor-pointer border border-gray-200"
                        onClick={() => openModal(blog.image!)}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs font-poppins">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-logo-black font-poppins">{blog.title}</div>
                    <div className="text-sm text-gray-500 font-poppins">{blog.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-poppins">{blog.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-poppins ${
                      blog.status === 'published' 
                        ? 'bg-leaf-100 text-leaf-800' 
                        : 'bg-sun-100 text-sun-800'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-poppins">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/blog/${blog._id}`}
                        className="text-logo-red hover:text-red-700 font-poppins"
                      >
                        View
                      </Link>
                      <Link
                        to={`/blog/edit/${blog._id}`}
                        className="text-leaf-600 hover:text-leaf-700 font-poppins"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-700 font-poppins"
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

        {sorted.length === 0 && (
          <div className="text-center py-8 text-gray-500 font-poppins">
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
              alt="Featured"
              className="max-w-full max-h-96 object-contain"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogList; 