import { motion } from "framer-motion";
import { StarIcon, HeartIcon, ShoppingBagIcon, MapPinIcon, PhoneIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function BrandDetails() {
  // Static data - will be replaced with GraphQL data
  const brand = {
    id: "nature-harvest",
    name: "Nature Harvest",
    tagline: "Pure. Natural. Delicious.",
    description: "Nature Harvest has been crafting premium juices for over 25 years, sourcing only the finest organic ingredients from sustainable farms around the world. Our commitment to quality and environmental responsibility has made us a trusted name in the juice industry.",
    logo: "/logo-full.png",
    founded: 1998,
    headquarters: "Fresh Valley, California",
    website: "www.natureharvest.com",
    phone: "+1 (800) NATURE-1",
    email: "hello@natureharvest.com",
    rating: 4.8,
    reviews: 1247,
    products: 24,
    certifications: ["USDA Organic", "Non-GMO Project", "Fair Trade Certified", "B Corp"],
    awards: [
      "Best Organic Juice Brand 2023",
      "Sustainability Excellence Award 2022",
      "Consumer Choice Award 2021"
    ],
    stats: {
      organicFarms: 150,
      countries: 12,
      employees: 250,
      customers: "2M+"
    },
    socialMedia: {
      instagram: "@natureharvest",
      facebook: "NatureHarvest",
      twitter: "@natureharvest",
      linkedin: "nature-harvest-juices"
    }
  };

  const products = [
    {
      id: 1,
      name: "Orange Sunrise",
      category: "Citrus",
      price: 4.99,
      rating: 4.8,
      image: "🍊",
      color: "bg-gradient-to-br from-orange-400 to-yellow-400"
    },
    {
      id: 2,
      name: "Apple Harvest",
      category: "Apple",
      price: 5.49,
      rating: 4.9,
      image: "🍎",
      color: "bg-gradient-to-br from-green-400 to-red-400"
    },
    {
      id: 3,
      name: "Berry Blast",
      category: "Berry",
      price: 6.49,
      rating: 4.9,
      image: "🫐",
      color: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
    {
      id: 4,
      name: "Tropical Paradise",
      category: "Tropical",
      price: 6.99,
      rating: 4.8,
      image: "🥭",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sun-yellow via-leaf-light to-sun-orange">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Brand Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-logo-green rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-gazpacho font-black text-gray-900">
                    {brand.name}
                  </h1>
                  <p className="text-xl text-logo-green font-poppins font-medium">
                    {brand.tagline}
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-600 font-poppins leading-relaxed mb-8">
                {brand.description}
              </p>

              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold text-gray-900">{brand.rating}</span>
                  <span className="text-gray-600">({brand.reviews} reviews)</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">{brand.products}</span> products
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {brand.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="bg-logo-green/10 text-logo-green px-3 py-1 rounded-full text-sm font-poppins font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Brand Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-logo-green to-green-600 rounded-3xl p-8 text-white"
            >
              <h3 className="text-2xl font-gazpacho font-bold mb-6">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{brand.stats.organicFarms}</div>
                  <div className="text-sm opacity-90">Organic Farms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{brand.stats.countries}</div>
                  <div className="text-sm opacity-90">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{brand.stats.employees}</div>
                  <div className="text-sm opacity-90">Employees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{brand.stats.customers}</div>
                  <div className="text-sm opacity-90">Happy Customers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-gradient-to-br from-white to-sun-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-gazpacho font-black text-gray-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-lg text-gray-600 font-poppins">
              Celebrating excellence in quality and sustainability
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {brand.awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-gazpacho font-bold text-gray-900 mb-2">
                  {award}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-gazpacho font-black text-gray-900 mb-4">
              Popular Products
            </h2>
            <p className="text-lg text-gray-600 font-poppins">
              Our best-selling juices loved by customers worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className={`${product.color} p-6 text-center text-white`}>
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  <h3 className="text-lg font-gazpacho font-bold mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm opacity-90 mb-3">{product.category}</p>
                  <div className="flex items-center justify-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-300 fill-current" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <button className="p-2 bg-logo-green text-white rounded-lg hover:bg-green-600 transition-colors">
                      <ShoppingBagIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              Get in Touch
            </h2>
            <p className="text-lg opacity-90 font-poppins">
              Have questions about our products or want to learn more?
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <MapPinIcon className="w-8 h-8 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-gazpacho font-bold mb-2">Headquarters</h3>
              <p className="text-sm opacity-80">{brand.headquarters}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <PhoneIcon className="w-8 h-8 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-gazpacho font-bold mb-2">Phone</h3>
              <p className="text-sm opacity-80">{brand.phone}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <GlobeAltIcon className="w-8 h-8 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-gazpacho font-bold mb-2">Website</h3>
              <p className="text-sm opacity-80">{brand.website}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 