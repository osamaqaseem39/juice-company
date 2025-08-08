import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { couponApi } from '../../services/api';

interface CouponFormProps {
  mode: 'add' | 'edit';
}

interface CouponFormData {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxDiscountAmount?: number;
  expiryDate?: string;
  isActive: boolean;
}

const CouponForm: React.FC<CouponFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(mode === 'edit');
  const [formData, setFormData] = useState<CouponFormData>({
    code: '',
    discountType: 'percentage',
    value: 0,
    minOrderValue: 0,
    maxDiscountAmount: 0,
    expiryDate: '',
    isActive: true
  });

  const discountTypeOptions = [
    { value: 'percentage', label: 'Percentage' },
    { value: 'fixed', label: 'Fixed Amount' }
  ];

  useEffect(() => {
    const fetchCoupon = async () => {
      if (mode === 'edit' && id) {
        try {
          const response = await couponApi.getById(id);
          const couponData = response.data;
          setFormData({
            ...couponData,
            expiryDate: couponData.expiryDate ? new Date(couponData.expiryDate).toISOString().split('T')[0] : ''
          });
          setError(null);
        } catch (err) {
          setError('Failed to fetch coupon. Please try again later.');
          console.error('Error fetching coupon:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoupon();
  }, [mode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        code: formData.code.toUpperCase(),
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null
      };

      if (mode === 'add') {
        await couponApi.create(payload);
        navigate('/coupons');
      } else if (mode === 'edit' && id) {
        await couponApi.update(id, payload);
        navigate('/coupons');
      }
    } catch (err) {
      setError(`Failed to ${mode} coupon. Please try again.`);
      console.error(`Error ${mode}ing coupon:`, err);
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
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
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
        {mode === 'add' ? 'Create New Coupon' : 'Edit Coupon'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Coupon Code *
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              className="flex-1 min-w-0 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter coupon code"
            />
            <button
              type="button"
              onClick={generateRandomCode}
              className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Generate
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Discount Type *
          </label>
          <select
            id="discountType"
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {discountTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Discount Value *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              min="0"
              step={formData.discountType === 'percentage' ? '0.01' : '0.01'}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                {formData.discountType === 'percentage' ? '%' : '$'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="minOrderValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Minimum Order Value
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="minOrderValue"
              name="minOrderValue"
              value={formData.minOrderValue || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="maxDiscountAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Maximum Discount Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="maxDiscountAmount"
              name="maxDiscountAmount"
              value={formData.maxDiscountAmount || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
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
            Active Coupon
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/coupons')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-500 border border-transparent rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : mode === 'add' ? 'Create Coupon' : 'Update Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CouponForm; 