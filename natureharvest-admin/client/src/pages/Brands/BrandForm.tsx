import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateBrand, useUpdateBrand, useBrand } from '../../services/apiService';
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

interface BrandFormData {
  name: string;
  description: string;
  image: string | null;
  status: string;
}

const validationRules: Record<keyof BrandFormData, ValidationRule> = {
  name: { required: true, minLength: 2, maxLength: 50 },
  description: { required: false, maxLength: 500 },
  image: { required: false },
  status: { required: true }
};

type BrandFormMode = 'add' | 'edit';

const BrandForm: React.FC<{ mode?: BrandFormMode }> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [createBrand] = useCreateBrand();
  const [updateBrand] = useUpdateBrand();
  const { data: brandData, loading: brandLoading } = useBrand(id || '');
  
  const [formData, setFormData] = useState<BrandFormData>({
    name: '',
    description: '',
    image: null,
    status: 'active'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const isEdit = mode === 'edit' || !!id;

  useEffect(() => {
    if (isEdit && brandData?.brand) {
      const brand = brandData.brand;
      setFormData({
        name: brand.name || '',
        description: brand.description || '',
        image: brand.image || null,
        status: brand.status || 'active'
      });
    }
  }, [isEdit, brandData]);

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
      const url = await uploadImageWithProgress(file, 'brand', (progress) => {
        setUploadProgress(progress);
      });
      
      setFormData(prev => ({ ...prev, image: url }));
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
      setFormData(prev => ({ ...prev, image: null }));
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
    setErrors({});

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        status: formData.status
      };

      if (isEdit && id) {
        await updateBrand({
          variables: {
            id,
            input: payload
          }
        });
      } else {
        await createBrand({
          variables: {
            input: payload
          }
        });
      }

      navigate('/brands');
    } catch (err) {
      setErrors({ submit: 'Failed to save brand.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/brands');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <FormLayout
      title={isEdit ? 'Edit Brand' : 'Add Brand'}
      description={`${isEdit ? 'Edit' : 'Add'} a new brand to your catalog`}
      backPath="/brands"
      backText="Back to Brands"
      error={errors.submit}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Brand Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter brand name"
            error={errors.name}
          />

          <FormField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            type="textarea"
            placeholder="Enter brand description"
            rows={3}
            error={errors.description}
          />

          <ImageUpload
            label="Brand Logo"
            value={formData.image}
            onChange={handleImageChange}
            onUpload={handleImageUpload}
            uploading={uploading}
            uploadProgress={uploadProgress}
            required={false}
          />

          <FormActions
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitText={isEdit ? 'Update Brand' : 'Add Brand'}
            loading={loading || uploading}
            disabled={uploading}
          />
        </form>
    </FormLayout>
  );
};

export default BrandForm; 