import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFlavor, useDeleteFlavor } from '../../hooks';
import { LoadingSpinner } from '../../components/forms/FormComponents';
import AuthGuard from '../../components/auth/AuthGuard';
import PageMeta from '../../components/common/PageMeta';

const FlavorDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFlavor(id || '');
  const [deleteFlavor] = useDeleteFlavor();

  const flavor = data?.flavor;

  const handleDelete = async () => {
    if (!flavor || !window.confirm('Are you sure you want to delete this flavor?')) {
      return;
    }

    try {
      await deleteFlavor({ variables: { id: flavor._id } });
      navigate('/flavors');
    } catch (err) {
      console.error('Error deleting flavor:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !flavor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-logo-red">Error: {error?.message || 'Flavor not found'}</div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <PageMeta
        title={`${flavor.name} | Nature Harvest Admin`}
        description={`Details for ${flavor.name} flavor`}
      />
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{flavor.name}</h1>
              <p className="text-gray-600">{flavor.brand?.name}</p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/flavors/${flavor._id}/edit`}
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
              {flavor.imageUrl && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Image</h3>
                  <img
                    src={flavor.imageUrl}
                    alt={flavor.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Description */}
              {flavor.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-700">{flavor.description}</p>
                </div>
              )}

              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flavor Profile:</span>
                    <span className="font-medium capitalize">{flavor.flavorProfile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      flavor.status === 'active' ? 'bg-green-100 text-green-800' :
                      flavor.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      flavor.status === 'discontinued' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {flavor.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Featured:</span>
                    <span className="font-medium">{flavor.featured ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              {flavor.ingredients && flavor.ingredients.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {flavor.ingredients.map((ingredient: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {flavor.tags && flavor.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {flavor.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Allergens */}
              {flavor.allergens && flavor.allergens.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Allergens</h3>
                  <div className="flex flex-wrap gap-2">
                    {flavor.allergens.map((allergen: string, index: number) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {flavor.certifications && flavor.certifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {flavor.certifications.map((cert: string, index: number) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutritional Information */}
              {flavor.nutritionalInfo && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Nutritional Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      {flavor.nutritionalInfo.calories && (
                        <div>
                          <span className="text-gray-600">Calories:</span>
                          <span className="ml-2 font-medium">{flavor.nutritionalInfo.calories}</span>
                        </div>
                      )}
                      {flavor.nutritionalInfo.protein && (
                        <div>
                          <span className="text-gray-600">Protein:</span>
                          <span className="ml-2 font-medium">{flavor.nutritionalInfo.protein}g</span>
                        </div>
                      )}
                      {flavor.nutritionalInfo.carbs && (
                        <div>
                          <span className="text-gray-600">Carbs:</span>
                          <span className="ml-2 font-medium">{flavor.nutritionalInfo.carbs}g</span>
                        </div>
                      )}
                      {flavor.nutritionalInfo.fat && (
                        <div>
                          <span className="text-gray-600">Fat:</span>
                          <span className="ml-2 font-medium">{flavor.nutritionalInfo.fat}g</span>
                        </div>
                      )}
                      {flavor.nutritionalInfo.fiber && (
                        <div>
                          <span className="text-gray-600">Fiber:</span>
                          <span className="ml-2 font-medium">{flavor.nutritionalInfo.fiber}g</span>
                        </div>
                      )}
                      {flavor.nutritionalInfo.sugar && (
                        <div>
                          <span className="text-gray-600">Sugar:</span>
                          <span className="ml-2 font-medium">{flavor.nutritionalInfo.sugar}g</span>
                        </div>
                      )}
                      {flavor.nutritionalInfo.vitaminC && (
                        <div>
                          <span className="text-gray-600">Vitamin C:</span>
                          <span className="ml-2 font-medium">{flavor.nutritionalInfo.vitaminC}mg</span>
                        </div>
                      )}
                      {flavor.nutritionalInfo.potassium && (
                        <div>
                          <span className="text-gray-600">Potassium:</span>
                          <span className="ml-2 font-medium">{flavor.nutritionalInfo.potassium}mg</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Sizes */}
              {flavor.sizes && flavor.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Sizes</h3>
                  <div className="space-y-3">
                    {flavor.sizes.map((size: any) => (
                      <div key={size._id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{size.sizeLabel}</span>
                          <span className="text-lg font-bold text-green-600">${size.price}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>Weight: {size.weight}g</div>
                          <div>Stock: {size.stock}</div>
                          <div>Available: {size.isAvailable ? 'Yes' : 'No'}</div>
                          {size.barcode && <div>Barcode: {size.barcode}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seasonality */}
              {flavor.seasonality && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Seasonality</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      Available from month {flavor.seasonality.startMonth} to {flavor.seasonality.endMonth}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/flavors"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Back to Flavors
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default FlavorDetail; 