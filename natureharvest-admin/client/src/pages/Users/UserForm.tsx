import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../../services/api';

interface UserFormProps {
  mode: 'add' | 'edit';
}

interface UserFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  roles: string[];
  isActive: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(mode === 'edit');
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    roles: ['customer'],
    isActive: true
  });

  const roleOptions = [
    { value: 'customer', label: 'Customer' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      if (mode === 'edit' && id) {
        try {
          const response = await userApi.getById(id);
          const { password, ...userData } = response.data;
          setFormData({
            ...userData,
            password: '' // Don't populate password field for security
          });
          setError(null);
        } catch (err) {
          setError('Failed to fetch user. Please try again later.');
          console.error('Error fetching user:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [mode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'add') {
        // For create, password is required
        await userApi.create(formData);
        navigate('/users');
      } else if (mode === 'edit' && id) {
        // For update, only include password if it's not empty
        const updatePayload = { ...formData };
        if (!updatePayload.password) {
          const { password, ...payloadWithoutPassword } = updatePayload;
          await userApi.update(id, payloadWithoutPassword);
        } else {
          await userApi.update(id, updatePayload);
        }
        navigate('/users');
      }
    } catch (err) {
      setError(`Failed to ${mode} user. Please try again.`);
      console.error(`Error ${mode}ing user:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setFormData(prev => ({
      ...prev,
      roles: [selectedRole]
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {mode === 'add' ? 'Create New User' : 'Edit User'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password {mode === 'add' ? '*' : '(leave blank to keep current)'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={mode === 'add'}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="roles" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Role *
          </label>
          <select
            id="roles"
            name="roles"
            value={formData.roles[0] || ''}
            onChange={handleRoleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Active User
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-500 border border-transparent rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : mode === 'add' ? 'Create User' : 'Update User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm; 