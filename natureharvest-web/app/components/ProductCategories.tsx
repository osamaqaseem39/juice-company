import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Static data - will be replaced with GraphQL data
  const categories = [
    {
      id: "all",
      name: "All Categories",
      count: 24,
      icon: "🍹",
      color: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      id: "citrus",
      name: "Citrus",
      count: 6,
      icon: "🍊",
      color: "bg-gradient-to-br from-orange-400 to-yellow-400"
    },
    {
      id: "tropical",
      name: "Tropical",
      count: 5,
      icon: "🥭",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500"
    },
    {
      id: "berry",
      name: "Berry",
      count: 4,
      icon: "🫐",
      color: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
    {
      id: "apple",
      name: "Apple",
      count: 3,
      icon: "🍎",
      color: "bg-gradient-to-br from-green-400 to-red-400"
    },
    {
      id: "grape",
      name: "Grape",
      count: 3,
      icon: "🍇",
      color: "bg-gradient-to-br from-purple-500 to-indigo-500"
    },
    {
      id: "vegetable",
      name: "Vegetable",
      count: 3,
      icon: "🥕",
      color: "bg-gradient-to-br from-green-500 to-orange-500"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-gazpacho font-black text-gray-900 mb-4">
            Browse by <span className="text-logo-green">Category</span>
          </h2>
          <p className="text-lg text-gray-600 font-poppins font-light max-w-2xl mx-auto">
            Explore our diverse range of premium juices organized by category
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? "ring-4 ring-logo-green ring-opacity-50"
                  : "hover:shadow-lg"
              }`}
            >
              {/* Background */}
              <div className={`absolute inset-0 ${category.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-lg font-gazpacho font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80 font-poppins">
                  {category.count} products
                </p>
              </div>

              {/* Active Indicator */}
              {activeCategory === category.id && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full"></div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Selected Category Info */}
        {activeCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 font-poppins">
              Showing {categories.find(c => c.id === activeCategory)?.count} products in{" "}
              <span className="font-semibold text-logo-green">
                {categories.find(c => c.id === activeCategory)?.name}
              </span>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
} 