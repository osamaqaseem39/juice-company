import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCoupons, useDeleteCoupon } from '../../services/api';

const CouponList: React.FC = () => {
  const { data, loading, error, refetch } = useCoupons();
  const [deleteCoupon] = useDeleteCoupon();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setDeletingId(id);
      try {
        await deleteCoupon({ variables: { id } });
        refetch();
      } catch (err) {
        console.error('Error deleting coupon:', err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const getDiscountTypeDisplay = (type: string) => {
    return type === 'percentage' ? 'Percentage' : 'Fixed Amount';
  };

  const getStatusBadge = (isActive: boolean, expiryDate?: string) => {
    if (!isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Inactive
        </span>
      );
    }

    if (expiryDate && new Date(expiryDate) < new Date()) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Expired
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    );
  };

  const formatValue = (value: number, type: string) => {
    return type === 'percentage' ? `${value}%` : `$${value.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading coupons: {error.message}
        </div>
      </div>
    );
  }

  const coupons = data?.coupons || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <Link
          to="/coupons/add"
          className="px-4 py-2 text-sm font-medium text-white bg-brand-500 border border-transparent rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        >
          Add New Coupon
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Min Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Max Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {coupons.map((coupon: any) => (
                <tr key={coupon._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {coupon.code}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getDiscountTypeDisplay(coupon.discountType)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatValue(coupon.value, coupon.discountType)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {coupon.minOrderValue ? `$${coupon.minOrderValue.toFixed(2)}` : 'No minimum'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {coupon.maxDiscountAmount ? `$${coupon.maxDiscountAmount.toFixed(2)}` : 'No limit'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : 'No expiry'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(coupon.isActive, coupon.expiryDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/coupons/edit/${coupon._id}`}
                        className="text-brand-600 hover:text-brand-900 dark:text-brand-400 dark:hover:text-brand-300"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        disabled={deletingId === coupon._id}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                      >
                        {deletingId === coupon._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {coupons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">No coupons found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponList; 