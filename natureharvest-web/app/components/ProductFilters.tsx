import { motion } from "framer-motion";
import { useState } from "react";
import { FunnelIcon, AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ProductFilters() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: "all",
    brand: "all",
    flavor: "all",
    size: "all",
    availability: "all",
    rating: "all"
  });

  // Static data - will be replaced with GraphQL data
  const filterOptions = {
    priceRanges: [
      { id: "all", label: "All Prices", count: 24 },
      { id: "under-5", label: "Under $5", count: 8 },
      { id: "5-10", label: "$5 - $10", count: 12 },
      { id: "10-15", label: "$10 - $15", count: 3 },
      { id: "over-15", label: "Over $15", count: 1 }
    ],
    brands: [
      { id: "all", label: "All Brands", count: 24 },
      { id: "nature-harvest", label: "Nature Harvest", count: 8 },
      { id: "fresh-pure", label: "Fresh & Pure", count: 6 },
      { id: "organic-delight", label: "Organic Delight", count: 5 },
      { id: "tropical-blend", label: "Tropical Blend", count: 3 },
      { id: "berry-burst", label: "Berry Burst", count: 2 }
    ],
    flavors: [
      { id: "all", label: "All Flavors", count: 24 },
      { id: "sweet", label: "Sweet", count: 10 },
      { id: "tart", label: "Tart", count: 6 },
      { id: "citrus", label: "Citrus", count: 4 },
      { id: "tropical", label: "Tropical", count: 3 },
      { id: "berry", label: "Berry", count: 1 }
    ],
    sizes: [
      { id: "all", label: "All Sizes", count: 24 },
      { id: "8oz", label: "8 oz", count: 6 },
      { id: "16oz", label: "16 oz", count: 12 },
      { id: "32oz", label: "32 oz", count: 4 },
      { id: "64oz", label: "64 oz", count: 2 }
    ],
    availability: [
      { id: "all", label: "All", count: 24 },
      { id: "in-stock", label: "In Stock", count: 20 },
      { id: "out-of-stock", label: "Out of Stock", count: 4 }
    ],
    ratings: [
      { id: "all", label: "All Ratings", count: 24 },
      { id: "4-5", label: "4+ Stars", count: 18 },
      { id: "3-4", label: "3+ Stars", count: 5 },
      { id: "2-3", label: "2+ Stars", count: 1 }
    ]
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      priceRange: "all",
      brand: "all",
      flavor: "all",
      size: "all",
      availability: "all",
      rating: "all"
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).filter(value => value !== "all").length;
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-logo-green text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <FunnelIcon className="w-5 h-5" />
              <span className="font-poppins font-medium">Filters</span>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-white text-logo-green text-xs font-bold px-2 py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
            
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
                <span className="text-sm font-poppins">Clear all</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-poppins">
              Showing 24 products
            </span>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-poppins focus:ring-2 focus:ring-logo-green focus:border-transparent">
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 py-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-gazpacho font-bold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  {filterOptions.priceRanges.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={option.id}
                        checked={activeFilters.priceRange === option.id}
                        onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                        className="w-4 h-4 text-logo-green border-gray-300 focus:ring-logo-green"
                      />
                      <span className="text-sm font-poppins text-gray-700">{option.label}</span>
                      <span className="text-xs text-gray-500">({option.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="text-lg font-gazpacho font-bold text-gray-900 mb-4">Brand</h3>
                <div className="space-y-2">
                  {filterOptions.brands.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        value={option.id}
                        checked={activeFilters.brand === option.id}
                        onChange={(e) => handleFilterChange("brand", e.target.value)}
                        className="w-4 h-4 text-logo-green border-gray-300 focus:ring-logo-green"
                      />
                      <span className="text-sm font-poppins text-gray-700">{option.label}</span>
                      <span className="text-xs text-gray-500">({option.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Flavor */}
              <div>
                <h3 className="text-lg font-gazpacho font-bold text-gray-900 mb-4">Flavor Profile</h3>
                <div className="space-y-2">
                  {filterOptions.flavors.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="flavor"
                        value={option.id}
                        checked={activeFilters.flavor === option.id}
                        onChange={(e) => handleFilterChange("flavor", e.target.value)}
                        className="w-4 h-4 text-logo-green border-gray-300 focus:ring-logo-green"
                      />
                      <span className="text-sm font-poppins text-gray-700">{option.label}</span>
                      <span className="text-xs text-gray-500">({option.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="text-lg font-gazpacho font-bold text-gray-900 mb-4">Size</h3>
                <div className="space-y-2">
                  {filterOptions.sizes.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value={option.id}
                        checked={activeFilters.size === option.id}
                        onChange={(e) => handleFilterChange("size", e.target.value)}
                        className="w-4 h-4 text-logo-green border-gray-300 focus:ring-logo-green"
                      />
                      <span className="text-sm font-poppins text-gray-700">{option.label}</span>
                      <span className="text-xs text-gray-500">({option.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-gazpacho font-bold text-gray-900 mb-4">Availability</h3>
                <div className="space-y-2">
                  {filterOptions.availability.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        value={option.id}
                        checked={activeFilters.availability === option.id}
                        onChange={(e) => handleFilterChange("availability", e.target.value)}
                        className="w-4 h-4 text-logo-green border-gray-300 focus:ring-logo-green"
                      />
                      <span className="text-sm font-poppins text-gray-700">{option.label}</span>
                      <span className="text-xs text-gray-500">({option.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-lg font-gazpacho font-bold text-gray-900 mb-4">Rating</h3>
                <div className="space-y-2">
                  {filterOptions.ratings.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={option.id}
                        checked={activeFilters.rating === option.id}
                        onChange={(e) => handleFilterChange("rating", e.target.value)}
                        className="w-4 h-4 text-logo-green border-gray-300 focus:ring-logo-green"
                      />
                      <span className="text-sm font-poppins text-gray-700">{option.label}</span>
                      <span className="text-xs text-gray-500">({option.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 