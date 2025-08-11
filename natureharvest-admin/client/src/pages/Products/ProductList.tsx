import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, useProducts, useDeleteProduct, useBrands } from '../../services/api';
import { Modal } from '../../components/ui/modal';
import PageMeta from '../../components/common/PageMeta';

const ProductList: React.FC = () => {
  const { data, loading, error, refetch } = useProducts();
  const [deleteProduct] = useDeleteProduct();
  const { data: brandsData } = useBrands();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'brand' | ''>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const products = data?.products || [];
  const brands = brandsData?.brands || [];

  // Create brand map for display
  const brandMap: { [key: string]: string } = {};
  brands.forEach((brand: any) => {
    brandMap[brand._id] = brand.name;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct({ variables: { id } });
        refetch(); // Refetch the data after deletion
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const openModal = (img: string) => {
    setModalImg(img.replace('server/', ''));
    setModalOpen(true);
  };

  // Search and sort logic
  const filtered = products.filter((p: Product) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a: Product, b: Product) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const handleSort = (key: 'name' | 'brand') => {
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
        title="Products | Nature Harvest Admin"
        description="Manage your product catalog"
      />
      <div className="w-full">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-64 text-gray-700 focus:ring-2 focus:ring-logo-red focus:border-logo-red"
              />
              <Link 
                to="/products/add" 
                className="bg-logo-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Product
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
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleSort('brand')}>
                      Brand {sortKey === 'brand' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Category</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((product) => (
                    <tr key={product._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        {product.gallery && product.gallery.length > 0 && (
                          <img
                            src={product.gallery[0].replace('server/', '')}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded cursor-pointer"
                            onClick={() => openModal(product.gallery![0]!)}
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        {brandMap[product.brand || ''] || 'N/A'}
                      </td>
                      <td className="px-4 py-2 border text-sm text-gray-700">
                        {product.category || 'N/A'}
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/products/${product._id}`}
                            className="text-logo-red hover:text-red-800"
                            title="View"
                          >
                            View
                          </Link>
                          <Link
                            to={`/products/${product._id}/edit`}
                            className="text-green-600 hover:text-green-800"
                            title="Edit"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
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
              No products found.
            </div>
          )}
        </div>

        {/* Image Modal */}
        {modalOpen && modalImg && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="p-4">
              <img
                src={modalImg}
                alt="Product"
                className="max-w-full max-h-96 object-contain"
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default ProductList; 