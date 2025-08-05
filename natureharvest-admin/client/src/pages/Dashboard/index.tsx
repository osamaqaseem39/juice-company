import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta';

const Dashboard: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Dashboard | Nature Harvest Admin"
        description="Welcome to your Nature Harvest admin dashboard"
      />
      <div className="w-full p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-poppins text-logo-black mb-2">
              Welcome to Nature Harvest
            </h1>
            <p className="text-lg text-gray-600 font-poppins">
              Manage your organic juice business with ease
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-logo-red to-red-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-poppins opacity-90">Total Products</p>
                  <p className="text-3xl font-bold font-poppins">24</p>
                </div>
                <div className="text-4xl opacity-80">🥤</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-leaf-500 to-leaf-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-poppins opacity-90">Active Orders</p>
                  <p className="text-3xl font-bold font-poppins">12</p>
                </div>
                <div className="text-4xl opacity-80">📦</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-sun-500 to-sun-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-poppins opacity-90">Revenue</p>
                  <p className="text-3xl font-bold font-poppins">$8,420</p>
                </div>
                <div className="text-4xl opacity-80">💰</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-logo-black to-gray-800 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-poppins opacity-90">Customers</p>
                  <p className="text-3xl font-bold font-poppins">156</p>
                </div>
                <div className="text-4xl opacity-80">👥</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-poppins text-logo-black mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/products/add"
                className="bg-white border-2 border-logo-red text-logo-red p-6 rounded-xl hover:bg-logo-red hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">➕</div>
                  <h3 className="text-lg font-semibold font-poppins mb-2">Add Product</h3>
                  <p className="text-sm font-poppins opacity-75">Create a new product listing</p>
                </div>
              </Link>

              <Link
                to="/blog/add"
                className="bg-white border-2 border-leaf-500 text-leaf-600 p-6 rounded-xl hover:bg-leaf-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-lg font-semibold font-poppins mb-2">Write Blog</h3>
                  <p className="text-sm font-poppins opacity-75">Create engaging content</p>
                </div>
              </Link>

              <Link
                to="/orders"
                className="bg-white border-2 border-sun-500 text-sun-600 p-6 rounded-xl hover:bg-sun-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">📋</div>
                  <h3 className="text-lg font-semibold font-poppins mb-2">View Orders</h3>
                  <p className="text-sm font-poppins opacity-75">Manage customer orders</p>
                </div>
              </Link>

              <Link
                to="/products"
                className="bg-white border-2 border-logo-black text-logo-black p-6 rounded-xl hover:bg-logo-black hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">🏷️</div>
                  <h3 className="text-lg font-semibold font-poppins mb-2">Manage Products</h3>
                  <p className="text-sm font-poppins opacity-75">Edit product catalog</p>
                </div>
              </Link>

              <Link
                to="/categories"
                className="bg-white border-2 border-leaf-600 text-leaf-700 p-6 rounded-xl hover:bg-leaf-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">📂</div>
                  <h3 className="text-lg font-semibold font-poppins mb-2">Categories</h3>
                  <p className="text-sm font-poppins opacity-75">Organize your products</p>
                </div>
              </Link>

              <Link
                to="/messages"
                className="bg-white border-2 border-red-500 text-red-600 p-6 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="text-lg font-semibold font-poppins mb-2">Messages</h3>
                  <p className="text-sm font-poppins opacity-75">Customer inquiries</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold font-poppins text-logo-black mb-4">Recent Activity</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-logo-red rounded-full"></div>
                  <p className="text-sm font-poppins text-gray-700">
                    New order #NH-2024-001 received from John Doe
                  </p>
                  <span className="text-xs text-gray-500 font-poppins">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-leaf-500 rounded-full"></div>
                  <p className="text-sm font-poppins text-gray-700">
                    Product "Organic Apple Juice" stock updated
                  </p>
                  <span className="text-xs text-gray-500 font-poppins">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-sun-500 rounded-full"></div>
                  <p className="text-sm font-poppins text-gray-700">
                    Blog post "Health Benefits of Fresh Juice" published
                  </p>
                  <span className="text-xs text-gray-500 font-poppins">1 day ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-logo-black rounded-full"></div>
                  <p className="text-sm font-poppins text-gray-700">
                    New customer Sarah Wilson registered
                  </p>
                  <span className="text-xs text-gray-500 font-poppins">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 