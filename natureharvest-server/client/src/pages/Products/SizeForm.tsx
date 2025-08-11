import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { sizeApi, Size } from '../../services/api';

const SizeForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [size, setSize] = useState<Partial<Size>>({ 
    name: '', 
    description: '', 
    image: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      sizeApi.getById(id)
        .then(res => {
          setSize(res.data);
          if (res.data.image) {
            setPreviewImage(res.data.image.replace('server/', ''));
          }
        })
        .catch(err => {
          console.error('Error fetching size:', err);
          alert('Error fetching size details');
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSize(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', size.name || '');
      formData.append('description', size.description || '');
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (id) {
        await sizeApi.update(id, formData);
        alert('Size updated successfully!');
      } else {
        await sizeApi.create(formData);
        alert('Size created successfully!');
      }
      
      navigate('/sizes');
    } catch (error: any) {
      console.error('Error saving size:', error);
      alert(error.response?.data?.error || 'Error saving size');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {id ? 'Edit Size' : 'Add New Size'}
          </h1>
          <Link
            to="/sizes"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← Back to Sizes
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input 
              type="text" 
              name="name" 
              value={size.name as string} 
              onChange={handleChange} 
              className="w-full border px-3 py-2 rounded" 
              required 
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea 
              name="description" 
              value={size.description as string} 
              onChange={handleChange} 
              className="w-full border px-3 py-2 rounded h-32 resize-none" 
              required 
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Image</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="w-full border px-3 py-2 rounded"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (id ? 'Update Size' : 'Create Size')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/sizes')}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SizeForm; 