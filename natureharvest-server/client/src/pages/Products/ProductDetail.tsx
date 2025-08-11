import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productApi, Product } from '../../services/api';
import { Modal } from '../../components/ui/modal';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      productApi.getById(id)
        .then(res => setProduct(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const openModal = (img: string) => {
    setModalImg(img.replace('server/', ''));
    setModalOpen(true);
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (!product) return <div className="flex justify-center items-center h-64">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{product.title}</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">{product.description}</p>
        {product.featuredImage && (
          <img
            src={product.featuredImage.replace('server/', '')}
            alt={product.title}
            className="w-full h-72 object-cover rounded-lg mb-4 cursor-pointer transition-transform hover:scale-105"
            onClick={() => openModal(product.featuredImage!)}
          />
        )}
        
        {/* Flavors Section */}
        {product.flavors && product.flavors.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Flavors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.flavors.map((flavor, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    {flavor.image && (
                      <img
                        src={flavor.image.replace('server/', '')}
                        alt={flavor.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <h3 className="font-medium text-gray-900 dark:text-white">{flavor.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{flavor.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sizes Section */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Sizes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.sizes.map((size, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    {size.image && (
                      <img
                        src={size.image.replace('server/', '')}
                        alt={size.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <h3 className="font-medium text-gray-900 dark:text-white">{size.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{size.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.gallery && product.gallery.length > 0 && (
          <div className="mb-4">
            <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Gallery</h2>
            <div className="grid grid-cols-3 gap-2">
              {product.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img.replace('server/', '')}
                  alt={`Gallery ${idx + 1}`}
                  className="h-24 w-full object-cover rounded cursor-pointer transition-transform hover:scale-105"
                  onClick={() => openModal(img)}
                />
              ))}
            </div>
          </div>
        )}
        <Link
          to="/products"
          className="inline-block mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          ← Back to Products
        </Link>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isFullscreen={false}>
        {modalImg && (
          <img src={modalImg} alt="Preview" className="max-h-[80vh] max-w-full rounded-lg mx-auto" />
        )}
      </Modal>
    </div>
  );
};

export default ProductDetail; 