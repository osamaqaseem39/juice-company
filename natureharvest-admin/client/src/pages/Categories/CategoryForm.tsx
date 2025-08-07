import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateCategory, useUpdateCategory, useCategory, useCategories } from '../../services/apiService';
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

interface CategoryFormData {
  name: string;
  description: string;
  image: string | null;
  parent: string;
  status: string;
}

const validationRules: Record<keyof CategoryFormData, ValidationRule> = {
  name: { required: true, minLength: 2, maxLength: 50 },
  description: { required: false, maxLength: 500 },
  image: { required: false },
  parent: { required: false },
  status: { required: true }
};

type CategoryFormMode = 'add' | 'edit';

const CategoryForm: React.FC<{ mode?: CategoryFormMode }> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [createCategory] = useCreateCategory();
  const [updateCategory] = useUpdateCategory();
  const { data: categoryData, loading: categoryLoading } = useCategory(id || '');
  const { data: categoriesData } = useCategories();
  
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    image: null,
    parent: '',
    status: 'active'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const isEdit = mode === 'edit' || !!id;
  const categories = categoriesData?.categories || [];

  useEffect(() => {
    if (isEdit && categoryData?.category) {
      const category = categoryData.category;
      setFormData({
        name: category.name || '',
        description: category.description || '',
        image: category.image || null,
        parent: category.parent?._id || '',
        status: category.status || 'active'
      });
    }
  }, [isEdit, categoryData]);

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
      const url = await uploadImageWithProgress(file, 'category', (progress) => {
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
        parent: formData.parent || undefined,
        status: formData.status
      };

      if (isEdit && id) {
        await updateCategory({
          variables: {
            id,
            input: payload
          }
        });
      } else {
        await createCategory({
          variables: {
            input: payload
          }
        });
      }

      navigate('/categories');
    } catch (err) {
      setErrors({ submit: 'Failed to save category.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/categories');
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
      title={isEdit ? 'Edit Category' : 'Add Category'}
      description={`${isEdit ? 'Edit' : 'Add'} a new category to your catalog`}
      backPath="/categories"
      backText="Back to Categories"
      error={errors.submit}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter category name"
            error={errors.name}
          />

          <FormField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            type="textarea"
            placeholder="Enter category description"
            rows={3}
            error={errors.description}
          />

          <ImageUpload
            label="Category Image"
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
            submitText={isEdit ? 'Update Category' : 'Add Category'}
            loading={loading || uploading}
            disabled={uploading}
          />
        </form>
    </FormLayout>
  );
};

export default CategoryForm; 