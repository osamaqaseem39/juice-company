import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const stats = [
    { name: "Total Products", value: "24", icon: "🍊", color: "bg-logo-red/10", textColor: "text-logo-red" },
    { name: "Total Services", value: "8", icon: "⚡", color: "bg-leaf-dark/10", textColor: "text-leaf-dark" },
    { name: "Total Brands", value: "12", icon: "🏷️", color: "bg-sun-yellow/10", textColor: "text-sun-yellow" },
    { name: "Total Categories", value: "6", icon: "📂", color: "bg-leaf-light/10", textColor: "text-leaf-light" },
  ];

  const quickActions = [
    {
      title: "Manage Products",
      description: "Add, edit, or remove products",
      icon: "🍊",
      link: "/products",
      color: "border-logo-red text-logo-red hover:bg-logo-red hover:text-white"
    },
    {
      title: "Manage Services",
      description: "Add, edit, or remove services",
      icon: "⚡",
      link: "/services",
      color: "border-leaf-dark text-leaf-dark hover:bg-leaf-dark hover:text-white"
    },
    {
      title: "Manage Brands",
      description: "Add, edit, or remove brands",
      icon: "🏷️",
      link: "/brands",
      color: "border-sun-yellow text-sun-yellow hover:bg-sun-yellow hover:text-white"
    },
    {
      title: "Manage Categories",
      description: "Add, edit, or remove categories",
      icon: "📂",
      link: "/categories",
      color: "border-leaf-light text-leaf-light hover:bg-leaf-light hover:text-white"
    },
    {
      title: "Manage Flavors",
      description: "Add, edit, or remove flavors",
      icon: "🥤",
      link: "/flavors",
      color: "border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
    },
    {
      title: "Manage Sizes",
      description: "Add, edit, or remove sizes",
      icon: "📏",
      link: "/sizes",
      color: "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
    }
  ];

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to Nature Harvest Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 ${stat.color} rounded-full`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`bg-white border-2 ${action.color} p-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{action.icon}</div>
              <h3 className="text-lg font-semibold font-poppins mb-1">{action.title}</h3>
              <p className="text-sm font-poppins opacity-75">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">System is running smoothly</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">All services are operational</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Database connection stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 