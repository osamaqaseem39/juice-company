import { useState } from "react";
import { motion } from "framer-motion";
import { StarIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const products = [
    {
      id: 1,
      name: "Orange Sunrise",
      category: "citrus",
      description: "Fresh squeezed oranges with a hint of natural sweetness. Perfect for breakfast or as a refreshing pick-me-up throughout the day.",
      price: 4.99,
      image: "🍊",
      color: "bg-gradient-to-br from-juice-orange to-orange-400",
      rating: 4.8,
      reviews: 124,
      nutrition: {
        calories: 110,
        sugar: 22,
        vitaminC: 120,
        fiber: 2
      },
      ingredients: ["Fresh Orange Juice", "Natural Sweetener"],
      size: "16 oz",
      inStock: true,
      featured: true
    },
    {
      id: 2,
      name: "Apple Harvest",
      category: "apple",
      description: "Crisp apple juice made from hand-picked organic apples. A classic taste that's both refreshing and nutritious.",
      price: 5.49,
      image: "🍎",
      color: "bg-gradient-to-br from-juice-apple to-green-400",
      rating: 4.9,
      reviews: 89,
      nutrition: {
        calories: 120,
        sugar: 24,
        vitaminC: 8,
        fiber: 1
      },
      ingredients: ["Organic Apple Juice", "Natural Preservatives"],
      size: "16 oz",
      inStock: true,
      featured: true
    },
    {
      id: 3,
      name: "Grape Escape",
      category: "grape",
      description: "Rich purple grape juice with deep, fruity flavors. Packed with antioxidants and natural sweetness.",
      price: 5.99,
      image: "🍇",
      color: "bg-gradient-to-br from-juice-grape to-purple-400",
      rating: 4.7,
      reviews: 156,
      nutrition: {
        calories: 140,
        sugar: 28,
        vitaminC: 4,
        fiber: 1
      },
      ingredients: ["Concord Grape Juice", "Natural Flavors"],
      size: "16 oz",
      inStock: true,
      featured: false
    },
    {
      id: 4,
      name: "Berry Blast",
      category: "berry",
      description: "Mixed berry medley with antioxidants and natural sweetness. A delicious blend of strawberries, blueberries, and raspberries.",
      price: 6.49,
      image: "🫐",
      color: "bg-gradient-to-br from-juice-berry to-pink-400",
      rating: 4.9,
      reviews: 203,
      nutrition: {
        calories: 130,
        sugar: 26,
        vitaminC: 45,
        fiber: 3
      },
      ingredients: ["Mixed Berry Juice", "Natural Sweetener", "Vitamin C"],
      size: "16 oz",
      inStock: true,
      featured: true
    },
    {
      id: 5,
      name: "Tropical Paradise",
      category: "tropical",
      description: "Exotic blend of pineapple, mango, and passion fruit. Transport yourself to a tropical island with every sip.",
      price: 6.99,
      image: "🥭",
      color: "bg-gradient-to-br from-juice-tropical to-yellow-400",
      rating: 4.8,
      reviews: 167,
      nutrition: {
        calories: 150,
        sugar: 30,
        vitaminC: 60,
        fiber: 2
      },
      ingredients: ["Pineapple Juice", "Mango Puree", "Passion Fruit Juice"],
      size: "16 oz",
      inStock: true,
      featured: false
    },
    {
      id: 6,
      name: "Citrus Splash",
      category: "citrus",
      description: "Refreshing blend of lemon, lime, and grapefruit. Perfect for detox and immune support.",
      price: 4.79,
      image: "🍋",
      color: "bg-gradient-to-br from-juice-citrus to-yellow-300",
      rating: 4.6,
      reviews: 98,
      nutrition: {
        calories: 90,
        sugar: 18,
        vitaminC: 80,
        fiber: 1
      },
      ingredients: ["Lemon Juice", "Lime Juice", "Grapefruit Juice"],
      size: "16 oz",
      inStock: false,
      featured: false
    },
    {
      id: 7,
      name: "Pomegranate Power",
      category: "berry",
      description: "Antioxidant-rich pomegranate juice with a bold, tart flavor. Great for heart health and overall wellness.",
      price: 7.49,
      image: "🫘",
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      rating: 4.7,
      reviews: 134,
      nutrition: {
        calories: 160,
        sugar: 32,
        vitaminC: 20,
        fiber: 1
      },
      ingredients: ["Pomegranate Juice", "Natural Preservatives"],
      size: "16 oz",
      inStock: true,
      featured: false
    },
    {
      id: 8,
      name: "Cranberry Cleanse",
      category: "berry",
      description: "Tart cranberry juice known for its urinary tract health benefits. Naturally sweetened for a balanced taste.",
      price: 5.79,
      image: "🫐",
      color: "bg-gradient-to-br from-red-600 to-pink-600",
      rating: 4.5,
      reviews: 87,
      nutrition: {
        calories: 100,
        sugar: 20,
        vitaminC: 15,
        fiber: 1
      },
      ingredients: ["Cranberry Juice", "Natural Sweetener"],
      size: "16 oz",
      inStock: true,
      featured: false
    }
  ];

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "citrus", name: "Citrus", count: products.filter(p => p.category === "citrus").length },
    { id: "apple", name: "Apple", count: products.filter(p => p.category === "apple").length },
    { id: "grape", name: "Grape", count: products.filter(p => p.category === "grape").length },
    { id: "berry", name: "Berry", count: products.filter(p => p.category === "berry").length },
    { id: "tropical", name: "Tropical", count: products.filter(p => p.category === "tropical").length }
  ];

  const filteredProducts = products
    .filter(product => activeCategory === "all" || product.category === activeCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sun-yellow via-leaf-light to-sun-orange">
      {/* Navigation */}
      <nav className="bg-logo-black sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-serif font-bold text-white">
                Nature Harvest
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-white hover:text-sun-yellow transition-colors">
                Home
              </a>
              <a href="/about" className="text-white hover:text-sun-yellow transition-colors">
                About
              </a>
              <a href="/products" className="text-sun-yellow font-semibold">
                Products
              </a>
              <a href="/contact" className="text-white hover:text-sun-yellow transition-colors">
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-logo-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                Find Store
              </button>
              <button className="bg-logo-red text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                🔍
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
                         <h1 className="text-5xl lg:text-6xl font-serif font-bold text-logo-black mb-6">
              Our Premium Collection
            </h1>
            <p className="text-xl text-natural-600 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully crafted selection of premium packaged juices, 
              each made with the finest natural ingredients and sustainable practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-white to-sun-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-natural-600 max-w-2xl mx-auto">
              Our most popular and highly-rated juices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.filter(p => p.featured).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow"
              >
                <div className={`${product.color} p-8 text-center text-white relative`}>
                  <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{product.description}</p>
                  <div className="flex items-center justify-center space-x-1">
                    <StarIcon className="w-5 h-5 text-yellow-300 fill-current" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-sm opacity-75">({product.reviews} reviews)</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-natural-900">${product.price}</span>
                    <span className="text-sm text-natural-500">{product.size}</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-natural-600">Calories:</span>
                      <span className="font-medium">{product.nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-natural-600">Vitamin C:</span>
                      <span className="font-medium">{product.nutrition.vitaminC}mg</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                                         <button className="flex-1 bg-leaf-dark text-white py-3 rounded-lg font-semibold hover:bg-leaf-light transition-colors">
                      Add to Cart
                    </button>
                    <button className="p-3 border border-natural-200 rounded-lg hover:bg-natural-50 transition-colors">
                      <HeartIcon className="w-5 h-5 text-natural-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-20 bg-gradient-to-r from-sun-yellow via-leaf-light to-sun-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4">
              All Products
            </h2>
            <p className="text-xl text-natural-600 max-w-2xl mx-auto">
              Browse our complete collection of premium juices
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                     activeCategory === category.id
                       ? "bg-leaf-dark text-white"
                       : "bg-white text-logo-black hover:text-logo-red border border-natural-200"
                   }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-natural-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-natural-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
              >
                <div className={`${product.color} p-6 text-center text-white relative`}>
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Out of Stock
                    </div>
                  )}
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-xs opacity-90 line-clamp-2">{product.description}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-natural-900">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-natural-600">{product.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-natural-500">Size:</span>
                      <span className="font-medium">{product.size}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-natural-500">Calories:</span>
                      <span className="font-medium">{product.nutrition.calories}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                                         <button 
                       className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                         product.inStock 
                           ? "bg-leaf-dark text-white hover:bg-leaf-light" 
                           : "bg-natural-200 text-natural-500 cursor-not-allowed"
                       }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button className="p-2 border border-natural-200 rounded-lg hover:bg-natural-50 transition-colors">
                      <HeartIcon className="w-4 h-4 text-natural-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-white to-sun-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4">
              Why Choose Nature Harvest?
            </h2>
            <p className="text-xl text-natural-600 max-w-2xl mx-auto">
              Every bottle represents our commitment to quality, health, and sustainability
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: "🌱",
                title: "100% Natural",
                description: "No artificial flavors, colors, or preservatives"
              },
              {
                icon: "🏆",
                title: "Premium Quality",
                description: "Hand-selected ingredients and expert craftsmanship"
              },
              {
                icon: "🌍",
                title: "Eco-Friendly",
                description: "Sustainable packaging and responsible sourcing"
              },
              {
                icon: "❤️",
                title: "Health Focused",
                description: "Rich in vitamins, minerals, and antioxidants"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-leaf-light rounded-xl"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-natural-900 mb-2">{benefit.title}</h3>
                <p className="text-natural-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-logo-red to-leaf-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-serif font-bold text-white">
              Ready to Experience Pure Nature?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Join thousands of customers who have discovered the difference that natural, 
              premium juices can make in their daily lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <button className="bg-white text-logo-red px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-colors shadow-lg">
                Shop Now
              </button>
                             <a href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-logo-red transition-colors">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-natural-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
                             <h3 className="text-2xl font-serif font-bold text-logo-red mb-4">
                Nature Harvest
              </h3>
              <p className="text-natural-300">
                Bringing you the purest flavors nature has to offer.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-natural-300">
                <li><a href="/products" className="hover:text-white transition-colors">Citrus Juices</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">Apple Juices</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">Berry Blends</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">Tropical Mixes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-natural-300">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-natural-300">
                <li>hello@natureharvest.com</li>
                <li>1-800-NATURE</li>
                <li>123 Juice Street</li>
                <li>Fresh City, FC 12345</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-natural-700 mt-8 pt-8 text-center text-natural-400">
            <p>&copy; 2024 Nature Harvest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 