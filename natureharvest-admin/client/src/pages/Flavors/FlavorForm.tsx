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
import { useCreateFlavor, useUpdateFlavor, useFlavor } from '../../hooks/useFlavors';
import { useBrands } from '../../hooks/useBrands';

interface FlavorFormData {
  brandId: string;
  name: string;
  description: string;
  flavorProfile: string;
  imageUrl: string | null;
  ingredients: string[];
  allergens: string[];
  certifications: string[];
  tags: string[];
  featured: boolean;
  status: string;
}

const validationRules: Record<keyof FlavorFormData, ValidationRule> = {
  brandId: { required: true },
  name: { required: true, minLength: 2, maxLength: 100 },
  description: { required: false, maxLength: 1000 },
  flavorProfile: { required: true, minLength: 2, maxLength: 200 },
  imageUrl: { required: false },
  ingredients: { required: false },
  allergens: { required: false },
  certifications: { required: false },
  tags: { required: false },
  featured: { required: false },
  status: { required: true }
};

type FlavorFormMode = 'add' | 'edit';

const FlavorForm: React.FC<{ mode?: FlavorFormMode }> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FlavorFormData>({
    brandId: '',
    name: '',
    description: '',
    flavorProfile: '',
    imageUrl: null,
    ingredients: [],
    allergens: [],
    certifications: [],
    tags: [],
    featured: false,
    status: 'active'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // GraphQL hooks
  const [createFlavor, { loading: createLoading, error: createError }] = useCreateFlavor();
  const [updateFlavor, { loading: updateLoading, error: updateError }] = useUpdateFlavor();
  const { data: flavorData, loading: fetchLoading } = useFlavor(id || '');
  const { data: brandsData, loading: brandsLoading } = useBrands();

  const isEdit = mode === 'edit' || !!id;

  useEffect(() => {
    if (isEdit && flavorData?.flavor) {
      const flavor = flavorData.flavor;
      setFormData({
        brandId: flavor.brand?._id || '',
        name: flavor.name || '',
        description: flavor.description || '',
        flavorProfile: flavor.flavorProfile || '',
        imageUrl: flavor.imageUrl || null,
        ingredients: flavor.ingredients || [],
        allergens: flavor.allergens || [],
        certifications: flavor.certifications || [],
        tags: flavor.tags || [],
        featured: flavor.featured || false,
        status: flavor.status || 'active'
      });
    }
  }, [isEdit, flavorData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayFieldChange = (field: keyof FlavorFormData, value: string) => {
    const newArray = value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const url = await uploadImageWithProgress(file, 'flavor', (progress) => {
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
        brandId: formData.brandId,
        name: formData.name,
        description: formData.description,
        flavorProfile: formData.flavorProfile,
        imageUrl: formData.imageUrl,
        ingredients: formData.ingredients,
        allergens: formData.allergens,
        certifications: formData.certifications,
        tags: formData.tags,
        featured: formData.featured,
        status: formData.status
      };

      if (isEdit && id) {
        await updateFlavor({
          variables: { id, input }
        });
      } else {
        await createFlavor({
          variables: { input }
        });
      }
      
      navigate('/flavors');
    } catch (error) {
      console.error('Error saving flavor:', error);
      setErrors({ submit: 'Failed to save flavor. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/flavors');
  };

  if (fetchLoading || brandsLoading) {
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
      title={isEdit ? 'Edit Flavor' : 'Add New Flavor'}
      description={`${isEdit ? 'Edit' : 'Add'} a new flavor variant`}
      backPath="/flavors"
      backText="Back to Flavors"
      error={submitError}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Brand"
          name="brandId"
          value={formData.brandId}
          onChange={handleChange}
          type="select"
          required
          error={errors.brandId}
          options={brandsData?.brands?.map((brand: any) => ({
            value: brand._id,
            label: brand.name
          })) || []}
        />

        <FormField
          label="Flavor Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter flavor name"
          error={errors.name}
        />

        <FormField
          label="Flavor Profile"
          name="flavorProfile"
          value={formData.flavorProfile}
          onChange={handleChange}
          required
          placeholder="e.g., Sweet and tangy with citrus notes"
          error={errors.flavorProfile}
        />

        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="textarea"
          placeholder="Enter flavor description"
          rows={4}
          error={errors.description}
        />

        <FormField
          label="Ingredients (comma-separated)"
          name="ingredients"
          value={formData.ingredients.join(', ')}
          onChange={(e) => handleArrayFieldChange('ingredients', e.target.value)}
          placeholder="e.g., Orange juice, sugar, natural flavors"
          error={errors.ingredients}
        />

        <FormField
          label="Allergens (comma-separated)"
          name="allergens"
          value={formData.allergens.join(', ')}
          onChange={(e) => handleArrayFieldChange('allergens', e.target.value)}
          placeholder="e.g., None, or list allergens"
          error={errors.allergens}
        />

        <FormField
          label="Certifications (comma-separated)"
          name="certifications"
          value={formData.certifications.join(', ')}
          onChange={(e) => handleArrayFieldChange('certifications', e.target.value)}
          placeholder="e.g., Organic, Non-GMO"
          error={errors.certifications}
        />

        <FormField
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={(e) => handleArrayFieldChange('tags', e.target.value)}
          placeholder="e.g., popular, seasonal, new"
          error={errors.tags}
        />

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
            { value: 'draft', label: 'Draft' }
          ]}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
            Featured Flavor
          </label>
        </div>

        <ImageUpload
          label="Flavor Image"
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
          submitText={isEdit ? 'Update Flavor' : 'Create Flavor'}
          loading={isSubmitting}
          disabled={uploading}
        />
      </form>
    </FormLayout>
  );
};

export default FlavorForm; 