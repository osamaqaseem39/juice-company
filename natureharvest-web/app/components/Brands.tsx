import { motion } from "framer-motion";

export default function Brands() {
  const brands = [
    {
      id: 1,
      name: "Orange Fresh",
      description: "Premium orange juice with natural pulp",
      image: "/images/brands/orange-fresh.jpg",
      category: "Citrus"
    },
    {
      id: 2,
      name: "Apple Delight",
      description: "Sweet and crisp apple juice blend",
      image: "/images/brands/apple-delight.jpg",
      category: "Fruit"
    },
    {
      id: 3,
      name: "Berry Blast",
      description: "Mixed berry juice with antioxidants",
      image: "/images/brands/berry-blast.jpg",
      category: "Berry"
    },
    {
      id: 4,
      name: "Grape Essence",
      description: "Rich purple grape juice",
      image: "/images/brands/grape-essence.jpg",
      category: "Grape"
    },
    {
      id: 5,
      name: "Mango Paradise",
      description: "Tropical mango juice blend",
      image: "/images/brands/mango-paradise.jpg",
      category: "Tropical"
    },
    {
      id: 6,
      name: "Pineapple Gold",
      description: "Refreshing pineapple juice",
      image: "/images/brands/pineapple-gold.jpg",
      category: "Tropical"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-gazpacho font-black text-gray-900 mb-6">
            Our Premium <span className="text-logo-green">Brands</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-poppins font-light max-w-3xl mx-auto">
            Discover our carefully curated collection of premium juice brands, each crafted with the finest natural ingredients
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Brand Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-logo-green/20 to-logo-red/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30">
                    {brand.category === "Citrus" && "🍊"}
                    {brand.category === "Fruit" && "🍎"}
                    {brand.category === "Berry" && "🫐"}
                    {brand.category === "Grape" && "🍇"}
                    {brand.category === "Tropical" && "🥭"}
                  </div>
                </div>
              </div>

              {/* Brand Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-poppins font-medium text-logo-green uppercase tracking-wide">
                    {brand.category}
                  </span>
                  <div className="w-8 h-8 bg-logo-green/10 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-logo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-gazpacho font-bold text-gray-900 mb-2 group-hover:text-logo-green transition-colors duration-300">
                  {brand.name}
                </h3>

                <p className="text-gray-600 font-poppins font-light text-sm leading-relaxed mb-4">
                  {brand.description}
                </p>

                <button className="w-full bg-logo-green text-white py-3 px-4 rounded-xl font-poppins font-medium hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-logo-red text-white px-8 py-4 rounded-full text-lg font-poppins font-medium hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            View All Brands
          </button>
        </motion.div>
      </div>
    </section>
  );
} 