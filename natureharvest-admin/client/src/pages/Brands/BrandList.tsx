import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brand, useBrands, useDeleteBrand } from '../../services/api';
import PageMeta from '../../components/common/PageMeta';

const BrandList: React.FC = () => {
  const { data, loading, error, refetch } = useBrands();
  const [deleteBrand] = useDeleteBrand();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | ''>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const brands = data?.brands || [];

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrand({ variables: { id } });
        refetch(); // Refetch the data after deletion
      } catch (err) {
        console.error('Error deleting brand:', err);
      }
    }
  };

  // Search and sort logic
  const filtered = brands.filter((b: Brand) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const handleSort = (key: 'name') => {
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
        title="Brands | Nature Harvest Admin"
        description="Manage your brand catalog"
      />
      <div className="w-full">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Brands</h1>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-64 text-gray-700 focus:ring-2 focus:ring-logo-red focus:border-logo-red"
              />
              <Link to="/brands/add" className="bg-logo-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">Add Brand</Link>
            </div>
          </div>
          
          {sorted.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('name')}>
                      Name {sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((b: Brand) => (
                    <tr key={b._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        {b.logo && (
                          <img 
                            src={`${b.logo.replace('uploads', 'uploads')}`} 
                            alt={b.name} 
                            className="w-16 h-16 object-cover rounded" 
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 border font-medium">{b.name}</td>
                      <td className="px-4 py-2 border">{b.description}</td>
                      <td className="px-4 py-2 border">
                        <Link 
                          to={`/brands/${b._id}/edit`} 
                          className="px-3 py-1 rounded font-semibold bg-green-600 text-white hover:bg-green-700 transition mr-2"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(b._id)} 
                          className="px-3 py-1 rounded font-semibold bg-red-600 text-white hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 text-gray-500">
              No brands found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandList; 