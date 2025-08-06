import { motion } from "framer-motion";
import { useState } from "react";
import { StarIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function Flavors() {
  const [activeFlavor, setActiveFlavor] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Static data - will be replaced with GraphQL data
  const flavors = [
    {
      id: 1,
      name: "Sweet & Tangy",
      category: "sweet",
      description: "Perfectly balanced sweetness with a refreshing tangy finish",
      products: 8,
      icon: "🍯",
      color: "bg-gradient-to-br from-yellow-400 to-orange-400",
      popularProducts: [
        { name: "Orange Sunrise", rating: 4.8, price: 4.99 },
        { name: "Apple Harvest", rating: 4.9, price: 5.49 },
        { name: "Mango Paradise", rating: 4.7, price: 6.99 }
      ]
    },
    {
      id: 2,
      name: "Tart & Zesty",
      category: "tart",
      description: "Bold tart flavors with citrus zing and natural acidity",
      products: 6,
      icon: "🍋",
      color: "bg-gradient-to-br from-yellow-300 to-green-400",
      popularProducts: [
        { name: "Citrus Splash", rating: 4.6, price: 4.79 },
        { name: "Lemon Lime", rating: 4.5, price: 4.99 },
        { name: "Grapefruit", rating: 4.4, price: 5.29 }
      ]
    },
    {
      id: 3,
      name: "Tropical Bliss",
      category: "tropical",
      description: "Exotic tropical flavors that transport you to paradise",
      products: 5,
      icon: "🥭",
      color: "bg-gradient-to-br from-yellow-400 to-pink-400",
      popularProducts: [
        { name: "Tropical Paradise", rating: 4.8, price: 6.99 },
        { name: "Pineapple Gold", rating: 4.7, price: 5.99 },
        { name: "Passion Fruit", rating: 4.6, price: 6.49 }
      ]
    },
    {
      id: 4,
      name: "Berry Burst",
      category: "berry",
      description: "Rich berry flavors packed with antioxidants and natural sweetness",
      products: 4,
      icon: "🫐",
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
      popularProducts: [
        { name: "Berry Blast", rating: 4.9, price: 6.49 },
        { name: "Strawberry Delight", rating: 4.8, price: 5.99 },
        { name: "Blueberry Dream", rating: 4.7, price: 6.29 }
      ]
    },
    {
      id: 5,
      name: "Citrus Fresh",
      category: "citrus",
      description: "Bright citrus flavors with natural vitamin C and refreshing taste",
      products: 6,
      icon: "🍊",
      color: "bg-gradient-to-br from-orange-400 to-red-400",
      popularProducts: [
        { name: "Orange Sunrise", rating: 4.8, price: 4.99 },
        { name: "Grapefruit", rating: 4.5, price: 5.29 },
        { name: "Lemon Lime", rating: 4.6, price: 4.79 }
      ]
    },
    {
      id: 6,
      name: "Herbal & Spiced",
      category: "herbal",
      description: "Unique herbal and spiced flavors for the adventurous palate",
      products: 3,
      icon: "🌿",
      color: "bg-gradient-to-br from-green-400 to-teal-400",
      popularProducts: [
        { name: "Ginger Turmeric", rating: 4.4, price: 7.99 },
        { name: "Mint Refresher", rating: 4.3, price: 6.49 },
        { name: "Cinnamon Apple", rating: 4.5, price: 5.99 }
      ]
    }
  ];

  const flavorCategories = [
    { id: "all", name: "All Flavors", count: flavors.length },
    { id: "sweet", name: "Sweet", count: flavors.filter(f => f.category === "sweet").length },
    { id: "tart", name: "Tart", count: flavors.filter(f => f.category === "tart").length },
    { id: "tropical", name: "Tropical", count: flavors.filter(f => f.category === "tropical").length },
    { id: "berry", name: "Berry", count: flavors.filter(f => f.category === "berry").length },
    { id: "citrus", name: "Citrus", count: flavors.filter(f => f.category === "citrus").length },
    { id: "herbal", name: "Herbal", count: flavors.filter(f => f.category === "herbal").length }
  ];

  const filteredFlavors = flavors.filter(flavor => 
    activeFlavor === "all" || flavor.category === activeFlavor
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sun-yellow via-leaf-light to-sun-orange">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-gazpacho font-black text-gray-900 mb-6">
              Explore Our <span className="text-logo-green">Flavors</span>
            </h1>
            <p className="text-xl text-gray-600 font-poppins font-light max-w-3xl mx-auto leading-relaxed">
              Discover our diverse range of flavor profiles, each carefully crafted to deliver 
              the perfect balance of taste, nutrition, and refreshment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flavor Categories */}
      <section className="py-12 bg-gradient-to-br from-white to-sun-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-gazpacho font-black text-gray-900 mb-4">
              Flavor Categories
            </h2>
            <p className="text-lg text-gray-600 font-poppins">
              Browse by your preferred taste profile
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {flavorCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveFlavor(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-poppins font-medium transition-all duration-300 ${
                  activeFlavor === category.id
                    ? "bg-logo-green text-white shadow-lg"
                    : "bg-white text-gray-700 hover:text-logo-green border border-gray-200 hover:border-logo-green"
                }`}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Flavors Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-gazpacho font-black text-gray-900">
              {activeFlavor === "all" ? "All Flavors" : flavorCategories.find(c => c.id === activeFlavor)?.name}
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-poppins focus:ring-2 focus:ring-logo-green focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="products">Sort by Products</option>
              <option value="popularity">Sort by Popularity</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFlavors.map((flavor, index) => (
              <motion.div
                key={flavor.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Flavor Header */}
                <div className={`${flavor.color} p-8 text-center text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {flavor.icon}
                    </div>
                    <h3 className="text-2xl font-gazpacho font-bold mb-2">
                      {flavor.name}
                    </h3>
                    <p className="text-sm opacity-90 mb-4">
                      {flavor.description}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <span>{flavor.products} products</span>
                      <span>•</span>
                      <span>Popular</span>
                    </div>
                  </div>
                </div>

                {/* Popular Products */}
                <div className="p-6">
                  <h4 className="text-lg font-gazpacho font-bold text-gray-900 mb-4">
                    Popular Products
                  </h4>
                  <div className="space-y-3">
                    {flavor.popularProducts.map((product, productIndex) => (
                      <div key={productIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h5 className="text-sm font-poppins font-medium text-gray-900">
                            {product.name}
                          </h5>
                          <div className="flex items-center space-x-2 mt-1">
                            <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-900">
                            ${product.price}
                          </span>
                          <button className="p-1 bg-logo-green text-white rounded hover:bg-green-600 transition-colors">
                            <ShoppingBagIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 bg-logo-green text-white py-3 px-4 rounded-xl font-poppins font-medium hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <span>View All {flavor.name} Products</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flavor Guide */}
      <section className="py-16 bg-gradient-to-br from-logo-green to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white mb-12"
          >
            <h2 className="text-3xl font-gazpacho font-black mb-4">
              Flavor Guide
            </h2>
            <p className="text-lg opacity-90 font-poppins max-w-2xl mx-auto">
              Not sure which flavor profile suits your taste? Use our guide to find your perfect match.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Sweet & Tangy",
                description: "Perfect for those who love balanced sweetness with a refreshing finish",
                icon: "🍯",
                recommendations: ["Breakfast", "Afternoon pick-me-up", "Kids favorite"]
              },
              {
                title: "Tart & Zesty",
                description: "Ideal for health-conscious individuals who enjoy bold, invigorating flavors",
                icon: "🍋",
                recommendations: ["Detox drinks", "Immune support", "Energy boost"]
              },
              {
                title: "Tropical Bliss",
                description: "Great for those seeking exotic, vacation-inspired refreshment",
                icon: "🥭",
                recommendations: ["Summer refreshment", "Party drinks", "Tropical escape"]
              }
            ].map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h3 className="text-xl font-gazpacho font-bold mb-3">{guide.title}</h3>
                <p className="text-sm opacity-90 mb-4">{guide.description}</p>
                <div className="space-y-2">
                  {guide.recommendations.map((rec, recIndex) => (
                    <div key={recIndex} className="text-xs opacity-75">• {rec}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 