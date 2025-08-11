import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSize, useDeleteSize } from '../../hooks/useSizes';
import { LoadingSpinner } from '../../components/forms/FormComponents';
import AuthGuard from '../../components/auth/AuthGuard';
import PageMeta from '../../components/common/PageMeta';

const SizeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useSize(id || '');
  const [deleteSize] = useDeleteSize();

  const size = data?.size;

  const handleDelete = async () => {
    if (!size || !window.confirm('Are you sure you want to delete this size?')) {
      return;
    }

    try {
      await deleteSize({ variables: { id: size._id } });
      navigate('/sizes');
    } catch (err) {
      console.error('Error deleting size:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !size) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-logo-red">Error: {error?.message || 'Size not found'}</div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <PageMeta
        title={`${size.name} | Nature Harvest Admin`}
        description={`Details for ${size.name} size`}
      />
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{size.name}</h1>
              <p className="text-gray-600">{size.description}</p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/sizes/${size._id}/edit`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Image */}
              {size.imageUrl && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Image</h3>
                  <img
                    src={size.imageUrl}
                    alt={size.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Description */}
              {size.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-700">{size.description}</p>
                </div>
              )}

              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${size.price?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{size.weight ? `${size.weight}g` : 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      size.status === 'active' ? 'bg-green-100 text-green-800' :
                      size.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {size.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available:</span>
                    <span className="font-medium">{size.isAvailable ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Dimensions */}
              {size.dimensions && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Dimensions (cm)</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-gray-600">Height:</span>
                        <span className="ml-2 font-medium">{size.dimensions.height || '0'} cm</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Width:</span>
                        <span className="ml-2 font-medium">{size.dimensions.width || '0'} cm</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Depth:</span>
                        <span className="ml-2 font-medium">{size.dimensions.depth || '0'} cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{new Date(size.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">{new Date(size.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/sizes"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Back to Sizes
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default SizeDetail; 