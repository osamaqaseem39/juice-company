import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useCreateProduct, 
  useUpdateProduct, 
  useProduct,
  useBrands, 
  useCategories
} from '../../services/apiService';
import { 
  FormField, 
  ImageUpload, 
  FormActions, 
  LoadingSpinner
} from '../../components/forms/FormComponents';
import { FormLayout } from '../../components/forms/FormLayout';
import { 
  uploadImageWithProgress, 
  formatText, 
  insertFormatting,
  validateForm,
  ValidationRule
} from '../../utils/formUtils';

interface ProductFormData {
  name: string;
  description: string;
  brandId: string;
  categoryId: string;
  images: string[];
  status: string;
}

const validationRules: Record<keyof ProductFormData, ValidationRule> = {
  name: { required: true, minLength: 2, maxLength: 100 },
  description: { required: true, minLength: 10 },
  brandId: { required: false },
  categoryId: { required: false },
  images: { required: false },
  status: { required: true }
};

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [createProduct] = useCreateProduct();
  const [updateProduct] = useUpdateProduct();
  const { data: productData, loading: productLoading } = useProduct(id || '');
  const { data: brandsData } = useBrands();
  const { data: categoriesData } = useCategories();

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    brandId: '',
    categoryId: '',
    images: [],
    status: 'active'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [descriptionPreview, setDescriptionPreview] = useState('');

  const brands = brandsData?.brands || [];
  const categories = categoriesData?.categories || [];
  
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (id && productData?.product) {
      const product = productData.product;
      setFormData({
        name: product.name || '',
        description: product.description || '',
        brandId: product.brandId?._id || '',
        categoryId: product.categoryId?._id || '',
        images: product.images || [],
        status: product.status || 'active'
      });
    }
  }, [id, productData]);

  useEffect(() => {
    setDescriptionPreview(formatText(formData.description));
  }, [formData.description]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const url = await uploadImageWithProgress(file, 'product', (progress) => {
        setUploadProgress(progress);
      });
      
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, url] 
      }));
      
      return url;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFormattingInsert = (format: string) => {
    if (descriptionTextareaRef.current) {
      insertFormatting(descriptionTextareaRef.current, format, (newValue) => {
        setFormData(prev => ({ ...prev, description: newValue }));
      });
    }
  };

  const validateFormData = (): boolean => {
    const validationErrors = validateForm(formData, validationRules);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateFormData()) {
      return;
    }

    setSubmitting(true);

    try {
      const productData = {
        ...formData,
        brandId: formData.brandId || undefined,
        categoryId: formData.categoryId || undefined
      };

      if (id) {
        await updateProduct({ variables: { id, ...productData } });
      } else {
        await createProduct({ variables: productData });
      }

      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ submit: 'Failed to save product. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (productData?.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <FormLayout
      title={id ? 'Edit Product' : 'Add New Product'}
      description={`${id ? 'Edit' : 'Add'} a new product to your catalog`}
      backPath="/products"
      backText="Back to Products"
      error={errors.submit}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Product Title"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product title"
                error={errors.name}
              />

              <FormField
                label="Brand"
                name="brandId"
                value={formData.brandId}
                onChange={handleChange}
                type="select"
                options={brands.map((brand: any) => ({
                  value: brand._id,
                  label: brand.name
                }))}
                error={errors.brandId}
              />

              <FormField
                label="Category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                type="select"
                options={categories.map((category: any) => ({
                  value: category._id,
                  label: category.name
                }))}
                error={errors.categoryId}
              />

              <FormField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                type="select"
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'discontinued', label: 'Discontinued' }
                ]}
                error={errors.status}
              />

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              
              <div className="mb-2">
                <div className="flex flex-wrap gap-2">
                  {['bold', 'italic', 'code', 'link', 'image', 'h1', 'h2', 'h3', 'ul', 'ol', 'quote', 'center', 'right', 'left', 'hr'].map(format => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => handleFormattingInsert(format)}
                      className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              <textarea
                ref={descriptionTextareaRef}
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-logo-red transition-colors"
                placeholder="Enter product description..."
              />
              
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description}</p>
              )}
              
              {formData.description && (
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: descriptionPreview }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              
              <ImageUpload
                label=""
                value={null}
                onChange={() => {}} // Handled by onUpload
                onUpload={handleImageUpload}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
              
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Product ${index + 1}`} 
                        className="w-full h-32 object-cover rounded border"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index)
                        }))}
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <FormActions
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitText={id ? 'Update Product' : 'Create Product'}
              loading={submitting}
              disabled={uploading}
            />
          </form>
    </FormLayout>
  );
};

export default ProductForm; 