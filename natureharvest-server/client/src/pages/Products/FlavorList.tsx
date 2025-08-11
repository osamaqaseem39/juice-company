import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { flavorApi, Flavor } from '../../services/api';

const FlavorList: React.FC = () => {
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'description'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchFlavors();
  }, []);

  const fetchFlavors = async () => {
    try {
      const response = await flavorApi.getAll();
      setFlavors(response.data);
    } catch (error) {
      console.error('Error fetching flavors:', error);
      alert('Error fetching flavors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this flavor?')) {
      try {
        await flavorApi.delete(id);
        setFlavors(flavors.filter(flavor => flavor._id !== id));
        alert('Flavor deleted successfully!');
      } catch (error) {
        console.error('Error deleting flavor:', error);
        alert('Error deleting flavor');
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

  const filtered = flavors.filter(flavor =>
    flavor.name.toLowerCase().includes(search.toLowerCase()) ||
    flavor.description.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flavors</h1>
          <Link
            to="/flavors/add"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            + Add New Flavor
          </Link>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search flavors..."
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
              {sorted.map((flavor) => (
                <tr key={flavor._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {flavor.image ? (
                      <img
                        src={flavor.image.replace('server/', '')}
                        alt={flavor.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 border font-medium">{flavor.name}</td>
                  <td className="px-4 py-2 border">
                    <div className="max-w-xs truncate" title={flavor.description}>
                      {flavor.description}
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <Link
                        to={`/flavors/edit/${flavor._id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(flavor._id!)}
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
            {search ? 'No flavors found matching your search.' : 'No flavors available.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlavorList; 