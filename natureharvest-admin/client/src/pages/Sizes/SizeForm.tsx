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

interface SizeFormData {
  name: string;
  description: string;
  imageUrl: string | null;
}

const validationRules: Record<keyof SizeFormData, ValidationRule> = {
  name: { required: true, minLength: 2, maxLength: 100 },
  description: { required: false, maxLength: 1000 },
  imageUrl: { required: false }
};

type SizeFormMode = 'add' | 'edit';

const SizeForm: React.FC<{ mode?: SizeFormMode }> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SizeFormData>({
    name: '',
    description: '',
    imageUrl: null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const isEdit = mode === 'edit' || !!id;

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      // TODO: Implement getSizeById hook
      setLoading(false);
    }
  }, [isEdit, id]);

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
      // TODO: Implement createSize and updateSize mutations
      console.log('Submitting size data:', formData);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <FormLayout
      title={isEdit ? 'Edit Size' : 'Add New Size'}
      description={`${isEdit ? 'Edit' : 'Add'} a new size variant`}
      backPath="/sizes"
      backText="Back to Sizes"
      error={errors.submit}
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
          loading={loading || uploading}
          disabled={uploading}
        />
      </form>
    </FormLayout>
  );
};

export default SizeForm; 