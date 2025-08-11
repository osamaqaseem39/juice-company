import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { flavorApi, Flavor } from '../../services/api';

const FlavorForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flavor, setFlavor] = useState<Partial<Flavor>>({ 
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
      flavorApi.getById(id)
        .then(res => {
          setFlavor(res.data);
          if (res.data.image) {
            setPreviewImage(res.data.image.replace('server/', ''));
          }
        })
        .catch(err => {
          console.error('Error fetching flavor:', err);
          alert('Error fetching flavor details');
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFlavor(prev => ({ ...prev, [name]: value }));
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
      formData.append('name', flavor.name || '');
      formData.append('description', flavor.description || '');
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (id) {
        await flavorApi.update(id, formData);
        alert('Flavor updated successfully!');
      } else {
        await flavorApi.create(formData);
        alert('Flavor created successfully!');
      }
      
      navigate('/flavors');
    } catch (error: any) {
      console.error('Error saving flavor:', error);
      alert(error.response?.data?.error || 'Error saving flavor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {id ? 'Edit Flavor' : 'Add New Flavor'}
          </h1>
          <Link
            to="/flavors"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← Back to Flavors
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input 
              type="text" 
              name="name" 
              value={flavor.name as string} 
              onChange={handleChange} 
              className="w-full border px-3 py-2 rounded" 
              required 
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea 
              name="description" 
              value={flavor.description as string} 
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
              {loading ? 'Saving...' : (id ? 'Update Flavor' : 'Create Flavor')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/flavors')}
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

export default FlavorForm; 