import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FormField, 
  ImageUpload, 
  FormActions, 
  LoadingSpinner
} from '../../components/forms/FormComponents';
import { FormLayout } from '../../components/forms/FormLayout';
import { 
  uploadImageWithProgress, 
  validateForm,
  ValidationRule
} from '../../utils/formUtils';
import { useCreateSize, useUpdateSize, useSize } from '../../hooks/useSizes';

interface SizeFormData {
  name: string;
  description: string;
  imageUrl: string | null;
  price: number;
  weight: number;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  isAvailable: boolean;
  status: string;
}

const validationRules: Record<keyof SizeFormData, ValidationRule> = {
  name: { required: true, minLength: 2, maxLength: 100 },
  description: { required: false, maxLength: 1000 },
  imageUrl: { required: false },
  price: { required: false, minValue: 0 },
  weight: { required: false, minValue: 0 },
  dimensions: { required: false },
  isAvailable: { required: false },
  status: { required: true }
};

type SizeFormMode = 'add' | 'edit';

const SizeForm: React.FC<{ mode?: SizeFormMode }> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SizeFormData>({
    name: '',
    description: '',
    imageUrl: null,
    price: 0,
    weight: 0,
    dimensions: {
      height: 0,
      width: 0,
      depth: 0
    },
    isAvailable: true,
    status: 'active'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // GraphQL hooks
  const [createSize, { loading: createLoading, error: createError }] = useCreateSize();
  const [updateSize, { loading: updateLoading, error: updateError }] = useUpdateSize();
  const { data: sizeData, loading: fetchLoading } = useSize(id || '');

  const isEdit = mode === 'edit' || !!id;

  useEffect(() => {
    if (isEdit && sizeData?.size) {
      const size = sizeData.size;
      setFormData({
        name: size.name || '',
        description: size.description || '',
        imageUrl: size.imageUrl || null,
        price: size.price || 0,
        weight: size.weight || 0,
        dimensions: {
          height: size.dimensions?.height || 0,
          width: size.dimensions?.width || 0,
          depth: size.dimensions?.depth || 0
        },
        isAvailable: size.isAvailable || true,
        status: size.status || 'active'
      });
    }
  }, [isEdit, sizeData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDimensionChange = (dimension: 'height' | 'width' | 'depth', value: string) => {
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: parseFloat(value) || 0
      }
    }));
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const url = await uploadImageWithProgress(file, 'size', (progress) => {
        setUploadProgress(progress);
      });
      
      setFormData(prev => ({ ...prev, imageUrl: url }));
      return url;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      handleImageUpload(file);
    } else {
      setFormData(prev => ({ ...prev, imageUrl: null }));
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

    setLoading(true);

    try {
      const input = {
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl,
        price: formData.price,
        weight: formData.weight,
        dimensions: formData.dimensions,
        isAvailable: formData.isAvailable,
        status: formData.status
      };

      if (isEdit && id) {
        await updateSize({
          variables: { id, input }
        });
      } else {
        await createSize({
          variables: { input }
        });
      }
      
      navigate('/sizes');
    } catch (error) {
      console.error('Error saving size:', error);
      setErrors({ submit: 'Failed to save size. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/sizes');
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const submitError = createError?.message || updateError?.message || errors.submit;
  const isSubmitting = createLoading || updateLoading || loading || uploading;

  return (
    <FormLayout
      title={isEdit ? 'Edit Size' : 'Add New Size'}
      description={`${isEdit ? 'Edit' : 'Add'} a new size variant`}
      backPath="/sizes"
      backText="Back to Sizes"
      error={submitError}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Size Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter size name (e.g., 250ml, 500ml, 1L)"
          error={errors.name}
        />

        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="textarea"
          placeholder="Enter size description"
          rows={4}
          error={errors.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            error={errors.price}
          />

          <FormField
            label="Weight (grams)"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            type="number"
            step="0.1"
            min="0"
            placeholder="0"
            error={errors.weight}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dimensions (cm)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Height</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions.height}
                onChange={(e) => handleDimensionChange('height', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-logo-red focus:border-logo-red"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Width</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions.width}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-logo-red focus:border-logo-red"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Depth</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.dimensions.depth}
                onChange={(e) => handleDimensionChange('depth', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-logo-red focus:border-logo-red"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            type="select"
            required
            error={errors.status}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'discontinued', label: 'Discontinued' }
            ]}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
              Available for Purchase
            </label>
          </div>
        </div>

        <ImageUpload
          label="Size Image"
          value={formData.imageUrl}
          onChange={handleImageChange}
          onUpload={handleImageUpload}
          uploading={uploading}
          uploadProgress={uploadProgress}
          required={false}
        />

        <FormActions
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitText={isEdit ? 'Update Size' : 'Create Size'}
          loading={isSubmitting}
          disabled={uploading}
        />
      </form>
    </FormLayout>
  );
};

export default SizeForm; 