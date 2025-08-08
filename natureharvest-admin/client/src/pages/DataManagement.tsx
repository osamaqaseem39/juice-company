import React, { useState, useEffect } from 'react';
import { useApiService, useBlogs, useProducts, useBrands, useCategories, useServices, useQuotes } from '../services/apiService';
import BlogForm from './Blog/BlogForm';
import ProductForm from './Products/ProductForm';
import BrandForm from './Brands/BrandForm';
import CategoryForm from './Categories/CategoryForm';
import ServiceForm from './Services/ServiceForm';
import QuoteForm from '../components/forms/QuoteForm';

interface DataItem {
  _id: string;
  title?: string;
  name?: string;
  description?: string;
  image?: string;
  featuredImage?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

const DataManagement: React.FC = () => {
  const apiService = useApiService();
  const [activeTab, setActiveTab] = useState<'blogs' | 'products' | 'brands' | 'categories' | 'services' | 'quotes'>('blogs');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GraphQL queries
  const { data: blogsData, loading: blogsLoading, error: blogsError, refetch: refetchBlogs } = useBlogs();
  const { data: productsData, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { data: brandsData, loading: brandsLoading, error: brandsError, refetch: refetchBrands } = useBrands();
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();
  const { data: servicesData, loading: servicesLoading, error: servicesError, refetch: refetchServices } = useServices();
  const { data: quotesData, loading: quotesLoading, error: quotesError, refetch: refetchQuotes } = useQuotes();

  const getCurrentData = () => {
    switch (activeTab) {
      case 'blogs':
        return blogsData?.blogs || [];
      case 'products':
        return productsData?.products || [];
      case 'brands':
        return brandsData?.brands || [];
      case 'categories':
        return categoriesData?.categories || [];
      case 'services':
        return servicesData?.services || [];
      case 'quotes':
        return quotesData?.quotes || [];
      default:
        return [];
    }
  };

  const getCurrentLoading = () => {
    switch (activeTab) {
      case 'blogs':
        return blogsLoading;
      case 'products':
        return productsLoading;
      case 'brands':
        return brandsLoading;
      case 'categories':
        return categoriesLoading;
      case 'services':
        return servicesLoading;
      case 'quotes':
        return quotesLoading;
      default:
        return false;
    }
  };

  const getCurrentError = () => {
    switch (activeTab) {
      case 'blogs':
        return blogsError;
      case 'products':
        return productsError;
      case 'brands':
        return brandsError;
      case 'categories':
        return categoriesError;
      case 'services':
        return servicesError;
      case 'quotes':
        return quotesError;
      default:
        return null;
    }
  };

  const getRefetchFunction = () => {
    switch (activeTab) {
      case 'blogs':
        return refetchBlogs;
      case 'products':
        return refetchProducts;
      case 'brands':
        return refetchBrands;
      case 'categories':
        return refetchCategories;
      case 'services':
        return refetchServices;
      case 'quotes':
        return refetchQuotes;
      default:
        return () => {};
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: DataItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      switch (activeTab) {
        case 'blogs':
          await apiService.deleteBlog(id);
          break;
        case 'products':
          await apiService.deleteProduct(id);
          break;
        case 'brands':
          await apiService.deleteBrand(id);
          break;
        case 'categories':
          await apiService.deleteCategory(id);
          break;
        case 'services':
          await apiService.deleteService(id);
          break;
        case 'quotes':
          await apiService.deleteQuote(id);
          break;
      }

      // Refetch data
      getRefetchFunction()();
    } catch (err: any) {
      setError(err.message || `Failed to delete ${activeTab.slice(0, -1)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    // Refetch data
    getRefetchFunction()();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const renderDataTable = (data: DataItem[]) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeTab === 'blogs' ? 'Title' : 'Name'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.title || item.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {item.description?.substring(0, 50)}
                    {item.description && item.description.length > 50 && '...'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === 'active' || item.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const tabs = [
    { id: 'blogs', label: 'Blogs' },
    { id: 'products', label: 'Products' },
    { id: 'brands', label: 'Brands' },
    { id: 'categories', label: 'Categories' },
    { id: 'services', label: 'Services' },
    { id: 'quotes', label: 'Quotes' },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Management</h1>
        <p className="text-gray-600">Manage all your data entities in one place</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Content */}
      {showForm ? (
        <div className="bg-gray-50 p-6 rounded-lg">
          {activeTab === 'blogs' && <BlogForm mode={editingItem ? 'edit' : 'add'} />}
          {activeTab === 'products' && <ProductForm />}
          {activeTab === 'brands' && <BrandForm mode={editingItem ? 'edit' : 'add'} />}
          {activeTab === 'categories' && <CategoryForm mode={editingItem ? 'edit' : 'add'} />}
          {activeTab === 'services' && <ServiceForm />}
          {activeTab === 'quotes' && <QuoteForm initialData={editingItem} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />}
        </div>
      ) : (
        <div>
          {/* Header with Create Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(0, -1).slice(1)}
            </button>
          </div>

          {/* Loading State */}
          {getCurrentLoading() && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {/* Error State */}
          {getCurrentError() && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              Error loading data: {getCurrentError()?.message}
            </div>
          )}

          {/* Data Table */}
          {!getCurrentLoading() && !getCurrentError() && (
            <div>
              {getCurrentData().length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No {activeTab} found. Create your first one!</p>
                </div>
              ) : (
                renderDataTable(getCurrentData())
              )}
            </div>
          )}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-center">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement; 