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
        <div className="text-logo-red font-poppins">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Products | Nature Harvest Admin"
        description="Manage your product catalog"
      />
      <div className="w-full p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-extrabold font-poppins text-logo-black">Products</h1>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-64 text-logo-black font-poppins focus:ring-2 focus:ring-logo-red focus:border-logo-red"
              />
              <Link to="/products/add" className="bg-logo-red hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-lg shadow font-poppins">Add Product</Link>
            </div>
          </div>
          
          {sorted.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full w-full border border-gray-200 rounded-lg text-logo-black">
                <thead className="text-logo-black bg-leaf-light">
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-2 border font-poppins font-medium">Image</th>
                    <th className="px-4 py-2 border cursor-pointer font-poppins font-medium" onClick={() => handleSort('name')}>
                      Name {sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border cursor-pointer font-poppins font-medium" onClick={() => handleSort('brand')}>
                      Brand {sortKey === 'brand' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </th>
                    <th className="px-4 py-2 border font-poppins font-medium">Category</th>
                    <th className="px-4 py-2 border font-poppins font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-logo-black">
                  {sorted.map((product) => (
                    <tr key={product._id} className="border-t hover:bg-leaf-50 transition-colors">
                      <td className="px-4 py-2 border">
                        {product.images && product.images.length > 0 && (
                          <img
                            src={product.images[0].replace('server/', '')}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded cursor-pointer border border-gray-200"
                            onClick={() => openModal(product.images![0]!)}
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 border font-medium font-poppins">{product.name}</td>
                      <td className="px-4 py-2 border font-poppins">{brandMap[product.brand || ''] || 'N/A'}</td>
                      <td className="px-4 py-2 border font-poppins">{product.category || 'N/A'}</td>
                      <td className="px-4 py-2 border">
                        <Link
                          to={`/products/${product._id}`}
                          className="px-3 py-1 rounded font-semibold bg-logo-red text-white hover:bg-red-700 transition mr-2 font-poppins"
                        >
                          View
                        </Link>
                        <Link
                          to={`/products/${product._id}/edit`}
                          className="px-3 py-1 rounded font-semibold bg-leaf-500 text-white hover:bg-leaf-600 transition mr-2 font-poppins"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1 rounded font-semibold bg-red-500 text-white hover:bg-red-600 transition font-poppins"
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
            <div className="flex justify-center items-center h-64 text-logo-black font-poppins">
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