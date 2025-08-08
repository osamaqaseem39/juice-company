import React from "react";
import { Link } from "react-router-dom";

const ECommerce: React.FC = () => {
  const products = [
    { name: "Orange Fresh", category: "Citrus", stock: 150, sales: 89 },
    { name: "Apple Delight", category: "Fruit", stock: 120, sales: 67 },
    { name: "Berry Blast", category: "Berry", stock: 80, sales: 45 },
    { name: "Grape Essence", category: "Grape", stock: 95, sales: 52 },
  ];

  const services = [
    { name: "Home Delivery", status: "Active", customers: 234 },
    { name: "Wholesale", status: "Active", customers: 156 },
    { name: "Subscription", status: "Active", customers: 89 },
  ];

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to Nature Harvest Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
            </div>
            <div className="p-3 bg-logo-red/10 rounded-full">
              <svg className="w-6 h-6 text-logo-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Services</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{services.length}</p>
            </div>
            <div className="p-3 bg-leaf-dark/10 rounded-full">
              <svg className="w-6 h-6 text-leaf-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$12,450</p>
            </div>
            <div className="p-3 bg-sun-yellow/10 rounded-full">
              <svg className="w-6 h-6 text-sun-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
            </div>
            <div className="p-3 bg-leaf-light/10 rounded-full">
              <svg className="w-6 h-6 text-leaf-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Link
          to="/products"
          className="bg-white border-2 border-logo-red text-logo-red p-4 rounded-xl hover:bg-logo-red hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🍊</div>
            <h3 className="text-lg font-semibold font-poppins mb-1">Manage Products</h3>
            <p className="text-sm font-poppins opacity-75">Add, edit, or remove products</p>
          </div>
        </Link>

        <Link
          to="/orders"
          className="bg-white border-2 border-sun-yellow text-sun-yellow p-4 rounded-xl hover:bg-sun-yellow hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="text-lg font-semibold font-poppins mb-1">View Orders</h3>
            <p className="text-sm font-poppins opacity-75">Manage customer orders</p>
          </div>
        </Link>

        <Link
          to="/categories"
          className="bg-white border-2 border-leaf-dark text-leaf-dark p-4 rounded-xl hover:bg-leaf-dark hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">📂</div>
            <h3 className="text-lg font-semibold font-poppins mb-1">Categories</h3>
            <p className="text-sm font-poppins opacity-75">Organize your products</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-logo-red rounded-full"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">New order #ORD-001 received</p>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-leaf-dark rounded-full"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product "Orange Fresh" stock updated</p>
            <span className="text-xs text-gray-500">15 minutes ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-sun-yellow rounded-full"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">New customer registered</p>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECommerce;
