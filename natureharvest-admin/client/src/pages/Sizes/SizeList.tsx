import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PencilIcon, 
  TrashBinIcon, 
  PlusIcon,
  EyeIcon
} from '../../icons';
import PageMeta from '../../components/common/PageMeta';
import { LoadingSpinner } from '../../components/forms/FormComponents';
import { useSizes, useDeleteSize } from '../../hooks/useSizes';
import AuthGuard from '../../components/auth/AuthGuard';

const SizeList: React.FC = () => {
  const { data, loading, error, refetch } = useSizes();
  const [deleteSize] = useDeleteSize();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'price' | 'weight' | ''>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sizes = data?.sizes || [];

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this size?')) {
      try {
        await deleteSize({ variables: { id } });
        refetch();
      } catch (error) {
        console.error('Error deleting size:', error);
      }
    }
  };

  // Search and sort logic
  const filtered = sizes.filter((size: any) =>
    size.name.toLowerCase().includes(search.toLowerCase()) ||
    size.description?.toLowerCase().includes(search.toLowerCase())
  );
  
  const sorted = [...filtered].sort((a: any, b: any) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const handleSort = (key: 'name' | 'price' | 'weight') => {
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
        <LoadingSpinner size="lg" />
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
    <AuthGuard>
      <PageMeta
        title="Sizes | Nature Harvest Admin"
        description="Manage your product sizes"
      />
      
      <div className="w-full">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Sizes</h1>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search sizes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-64 text-gray-700 focus:ring-2 focus:ring-logo-red focus:border-logo-red"
              />
              <Link
                to="/sizes/add"
                className="bg-logo-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                Add Size
              </Link>
            </div>
          </div>

          {sorted.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Image</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleSort('name')}>
                      Name {sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleSort('price')}>
                      Price {sortKey === 'price' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleSort('weight')}>
                      Weight {sortKey === 'weight' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Available</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Created</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((size: any) => (
                    <tr key={size._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        {size.imageUrl ? (
                          <img
                            src={size.imageUrl}
                            alt={size.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="font-medium text-gray-900">{size.name}</div>
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        <div className="truncate max-w-xs">{size.description}</div>
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        ${size.price?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        {size.weight ? `${size.weight}g` : '-'}
                      </td>
                      <td className="px-4 py-2 border">
                        <span className={`px-2 py-1 rounded text-xs ${
                          size.status === 'active' ? 'bg-green-100 text-green-800' :
                          size.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {size.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border">
                        <span className={`px-2 py-1 rounded text-xs ${
                          size.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {size.isAvailable ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        {new Date(size.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/sizes/${size._id}`}
                            className="text-logo-red hover:text-red-800"
                            title="View"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/sizes/${size._id}/edit`}
                            className="text-green-600 hover:text-green-800"
                            title="Edit"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(size._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <TrashBinIcon className="w-4 h-4" />
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
              No sizes found.
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default SizeList; 