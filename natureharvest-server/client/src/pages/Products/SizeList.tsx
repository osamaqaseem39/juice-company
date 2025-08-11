import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sizeApi, Size } from '../../services/api';

const SizeList: React.FC = () => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'description'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    try {
      const response = await sizeApi.getAll();
      setSizes(response.data);
    } catch (error) {
      console.error('Error fetching sizes:', error);
      alert('Error fetching sizes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this size?')) {
      try {
        await sizeApi.delete(id);
        setSizes(sizes.filter(size => size._id !== id));
        alert('Size deleted successfully!');
      } catch (error) {
        console.error('Error deleting size:', error);
        alert('Error deleting size');
      }
    }
  };

  const handleSort = (key: 'name' | 'description') => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = sizes.filter(size =>
    size.name.toLowerCase().includes(search.toLowerCase()) ||
    size.description.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    if (sortDir === 'asc') {
      return aVal.localeCompare(bVal);
    } else {
      return bVal.localeCompare(aVal);
    }
  });

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sizes</h1>
          <Link
            to="/sizes/add"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            + Add New Size
          </Link>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search sizes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border px-3 py-2 rounded"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full border border-gray-200 rounded-lg text-[#062373]">
            <thead className="text-[#062373]">
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('name')}>
                  Name {sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                </th>
                <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('description')}>
                  Description {sortKey === 'description' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                </th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((size) => (
                <tr key={size._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {size.image ? (
                      <img
                        src={size.image.replace('server/', '')}
                        alt={size.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 border font-medium">{size.name}</td>
                  <td className="px-4 py-2 border">
                    <div className="max-w-xs truncate" title={size.description}>
                      {size.description}
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <Link
                        to={`/sizes/edit/${size._id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(size._id!)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
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
          <div className="text-center py-8 text-gray-500">
            {search ? 'No sizes found matching your search.' : 'No sizes available.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SizeList; 