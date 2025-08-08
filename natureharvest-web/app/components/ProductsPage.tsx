import { motion } from "framer-motion";
import { useState } from "react";
import { StarIcon, HeartIcon, ShoppingBagIcon, Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";
import ProductCategories from "./ProductCategories";
import ProductFilters from "./ProductFilters";
import BrandDetails from "./BrandDetails";
import Flavors from "./Flavors";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  // Static data - will be replaced with GraphQL data
  const products = [
    {
      id: 1,
      name: "Orange Sunrise",
      brand: "Nature Harvest",
      category: "citrus",
      flavor: "sweet",
      description: "Fresh squeezed oranges with a hint of natural sweetness",
      price: 4.99,
      originalPrice: 6.99,
      image: "🍊",
      color: "bg-gradient-to-br from-orange-400 to-yellow-400",
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
      featured: true,
      discount: 29
    },
    {
      id: 2,
      name: "Apple Harvest",
      brand: "Fresh & Pure",
      category: "apple",
      flavor: "sweet",
      description: "Crisp apple juice made from hand-picked organic apples",
      price: 5.49,
      originalPrice: 5.49,
      image: "🍎",
      color: "bg-gradient-to-br from-green-400 to-red-400",
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
      featured: true,
      discount: 0
    },
    {
      id: 3,
      name: "Berry Blast",
      brand: "Nature Harvest",
      category: "berry",
      flavor: "sweet",
      description: "Mixed berry medley with antioxidants and natural sweetness",
      price: 6.49,
      originalPrice: 7.99,
      image: "🫐",
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
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
      featured: true,
      discount: 19
    },
    {
      id: 4,
      name: "Tropical Paradise",
      brand: "Tropical Blend",
      category: "tropical",
      flavor: "tropical",
      description: "Exotic blend of pineapple, mango, and passion fruit",
      price: 6.99,
      originalPrice: 6.99,
      image: "🥭",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
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
      featured: false,
      discount: 0
    },
    {
      id: 5,
      name: "Citrus Splash",
      brand: "Fresh & Pure",
      category: "citrus",
      flavor: "tart",
      description: "Refreshing blend of lemon, lime, and grapefruit",
      price: 4.79,
      originalPrice: 5.99,
      image: "🍋",
      color: "bg-gradient-to-br from-yellow-300 to-green-400",
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
      featured: false,
      discount: 20
    },
    {
      id: 6,
      name: "Pomegranate Power",
      brand: "Organic Delight",
      category: "berry",
      flavor: "tart",
      description: "Antioxidant-rich pomegranate juice with a bold, tart flavor",
      price: 7.49,
      originalPrice: 8.99,
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
      featured: false,
      discount: 17
    }
  ];

  const brands = [
    { id: "all", name: "All Brands", count: products.length },
    { id: "nature-harvest", name: "Nature Harvest", count: products.filter(p => p.brand === "Nature Harvest").length },
    { id: "fresh-pure", name: "Fresh & Pure", count: products.filter(p => p.brand === "Fresh & Pure").length },
    { id: "tropical-blend", name: "Tropical Blend", count: products.filter(p => p.brand === "Tropical Blend").length },
    { id: "organic-delight", name: "Organic Delight", count: products.filter(p => p.brand === "Organic Delight").length }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const brandMatch = selectedBrand === "all" || product.brand.toLowerCase().replace(/\s+/g, '-') === selectedBrand;
    return categoryMatch && brandMatch;
  });

  const tabs = [
    { id: "products", name: "Products", icon: "🍹" },
    { id: "categories", name: "Categories", icon: "📂" },
    { id: "brands", name: "Brands", icon: "🏷️" },
    { id: "flavors", name: "Flavors", icon: "👅" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <div className="space-y-8">
            {/* Filters and Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex flex-wrap gap-3">
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand.id)}
                      className={`px-4 py-2 rounded-full text-sm font-poppins font-medium transition-all duration-300 ${
                        selectedBrand === brand.id
                          ? "bg-logo-green text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:text-logo-green hover:bg-gray-200"
                      }`}
                    >
                      {brand.name} ({brand.count})
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid" ? "bg-white text-logo-green shadow-sm" : "text-gray-500"
                      }`}
                    >
                      <Squares2X2Icon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "list" ? "bg-white text-logo-green shadow-sm" : "text-gray-500"
                      }`}
                    >
                      <ListBulletIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  {/* Product Image */}
                  <div className={`${product.color} p-6 text-center text-white relative ${
                    viewMode === "list" ? "w-32 flex-shrink-0" : ""
                  }`}>
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        -{product.discount}%
                      </div>
                    )}
                    <div className={`${viewMode === "list" ? "text-4xl" : "text-6xl"} mb-3 group-hover:scale-110 transition-transform`}>
                      {product.image}
                    </div>
                    {viewMode === "list" && (
                      <div className="text-xs opacity-90">{product.brand}</div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-gazpacho font-bold text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-poppins mb-2">
                          {product.description}
                        </p>
                        {viewMode === "grid" && (
                          <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                        )}
                      </div>
                      {viewMode === "list" && (
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{product.size}</span>
                    </div>

                    {viewMode === "grid" && (
                      <div className="flex items-center space-x-2 mb-4">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button 
                        className={`flex-1 py-3 px-4 rounded-xl font-poppins font-medium transition-all duration-300 ${
                          product.inStock 
                            ? "bg-logo-green text-white hover:bg-green-600 transform hover:scale-105" 
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                      <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <HeartIcon className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case "categories":
        return <ProductCategories />;
      case "brands":
        return <BrandDetails />;
      case "flavors":
        return <Flavors />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sun-yellow via-leaf-light to-sun-orange">
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-gazpacho font-black text-gray-900 mb-6">
              Our <span className="text-logo-green">Products</span>
            </h1>
            <p className="text-xl text-gray-600 font-poppins font-light max-w-3xl mx-auto leading-relaxed">
              Discover our premium collection of natural juices, carefully crafted with the finest ingredients 
              and sustainable practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-poppins font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-logo-green text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:text-logo-green hover:bg-gray-200"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </section>
    </div>
  );
} 