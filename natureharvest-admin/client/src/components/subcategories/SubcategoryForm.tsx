import React, { useState, useEffect } from 'react';
import { useCreateSubcategory, useUpdateSubcategory, useCategories } from '../../hooks';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';
import Select from '../form/Select';
import Switch from '../form/switch/Switch';
import { useFileUpload } from '../../hooks';
import { CloseIcon, UploadIcon } from '../../icons';

interface SubcategoryFormProps {
  subcategory?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({
  subcategory,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    isActive: true
  });

  const [createSubcategory] = useCreateSubcategory();
  const [updateSubcategory] = useUpdateSubcategory();
  const { data: categoriesData } = useCategories();
  const { uploadFile, loading: uploadLoading } = useFileUpload();

  const isEditing = !!subcategory;

  useEffect(() => {
    if (subcategory) {
      setFormData({
        name: subcategory.name || '',
        description: subcategory.description || '',
        category: subcategory.category || '',
        image: subcategory.image || '',
        isActive: subcategory.isActive ?? true
      });
    }
  }, [subcategory]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      const result = await uploadFile(file);
      if (result?.fileUrl) {
        setFormData(prev => ({
          ...prev,
          image: result.fileUrl
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const input = {
        name: formData.name,
        description: formData.description,
        parentCategoryId: formData.category,
        image: formData.image,
        isActive: formData.isActive
      };

      if (isEditing) {
        await updateSubcategory({
          variables: {
            id: subcategory._id,
            input
          }
        });
      } else {
        await createSubcategory({
          variables: { input }
        });
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error saving subcategory:', error);
    }
  };

  const categories = categoriesData?.categories || [];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Subcategory' : 'Create Subcategory'}
        </h2>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            <CloseIcon className="w-4 h-4" />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="Enter subcategory name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <TextArea
              value={formData.description}
              onChange={(value) => handleInputChange('description', value)}
              placeholder="Enter subcategory description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Parent Category *
            </label>
            <Select
              value={formData.category}
              onChange={(value) => handleInputChange('category', value)}
              options={categories.map((cat: any) => ({
                value: cat._id,
                label: cat.name
              }))}
              placeholder="Select parent category"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div className="flex items-center gap-4">
              {formData.image && (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-20 h-20 rounded object-cover"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleInputChange('image', '')}
                    className="absolute -top-2 -right-2 p-1 h-6 w-6"
                  >
                    <CloseIcon className="w-3 h-3" />
                  </Button>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <div className="text-center">
                    <UploadIcon className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {uploadLoading ? 'Uploading...' : 'Click to upload image'}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Active Status
            </label>
            <Switch
              label="Enable or disable this subcategory"
              defaultChecked={formData.isActive}
              onChange={(checked) => handleInputChange('isActive', checked)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={uploadLoading}>
            {isEditing ? 'Update Subcategory' : 'Create Subcategory'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubcategoryForm; 