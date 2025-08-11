import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FormField, 
  FormActions, 
  LoadingSpinner
} from '../../components/forms/FormComponents';
import { FormLayout } from '../../components/forms/FormLayout';
import { 
  validateForm,
  ValidationRule
} from '../../utils/formUtils';
import { useCreateSize, useUpdateSize, useSize } from '../../hooks/useSizes';

interface SizeFormData {
  name: string;
  description: string;
  status: string;
}

const validationRules: Record<keyof SizeFormData, ValidationRule> = {
  name: { required: true, minLength: 2, maxLength: 100 },
  description: { required: false, maxLength: 1000 },
  status: { required: true }
};

type SizeFormMode = 'add' | 'edit';

const SizeForm: React.FC<{ mode?: SizeFormMode }> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SizeFormData>({
    name: '',
    description: '',
    status: 'active'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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
        status: size.status || 'active'
      });
    }
  }, [isEdit, sizeData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
  const isSubmitting = createLoading || updateLoading || loading;

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

        <FormActions
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitText={isEdit ? 'Update Size' : 'Create Size'}
          loading={isSubmitting}
        />
      </form>
    </FormLayout>
  );
};

export default SizeForm; 