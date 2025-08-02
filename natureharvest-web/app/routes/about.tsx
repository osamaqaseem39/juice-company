import { motion } from "framer-motion";
import { SparklesIcon, HeartIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function About() {
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
              <a href="/about" className="text-sun-yellow font-semibold">
                About
              </a>
              <a href="/products" className="text-white hover:text-sun-yellow transition-colors">
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
              Our Story
            </h1>
            <p className="text-xl text-natural-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to becoming a trusted name in premium packaged juices, 
              Nature Harvest has been bringing the pure taste of nature to families for over two decades.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-white to-sun-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
                             <h2 className="text-4xl font-serif font-bold text-logo-black">
                Our Mission
              </h2>
              <p className="text-lg text-natural-600 leading-relaxed">
                At Nature Harvest, we believe that everyone deserves access to the pure, 
                unadulterated taste of nature's finest fruits. Our mission is to create 
                premium packaged juices that not only taste incredible but also nourish 
                your body with the goodness nature intended.
              </p>
              <p className="text-lg text-natural-600 leading-relaxed">
                We work directly with local farmers and use only the highest quality, 
                sustainably sourced ingredients. Every bottle of Nature Harvest juice 
                represents our commitment to quality, sustainability, and your health.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
                             <div className="bg-gradient-to-br from-sun-yellow to-leaf-light rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div className="text-4xl mb-2">🌱</div>
                    <h3 className="font-semibold text-natural-900">Organic</h3>
                    <p className="text-sm text-natural-600">100% certified organic ingredients</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div className="text-4xl mb-2">🌍</div>
                    <h3 className="font-semibold text-natural-900">Sustainable</h3>
                    <p className="text-sm text-natural-600">Eco-friendly packaging</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div className="text-4xl mb-2">🏆</div>
                    <h3 className="font-semibold text-natural-900">Premium</h3>
                    <p className="text-sm text-natural-600">Hand-selected quality</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div className="text-4xl mb-2">❤️</div>
                    <h3 className="font-semibold text-natural-900">Healthy</h3>
                    <p className="text-sm text-natural-600">No artificial additives</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-sun-yellow via-leaf-light to-sun-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16"
           >
             <h2 className="text-4xl font-serif font-bold text-logo-black mb-4">
               Our Values
             </h2>
            <p className="text-xl text-natural-600 max-w-2xl mx-auto">
              These core values guide everything we do at Nature Harvest
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: SparklesIcon,
                title: "Natural Purity",
                description: "We believe in the power of natural ingredients. Every product we create is free from artificial flavors, colors, and preservatives."
              },
              {
                icon: HeartIcon,
                title: "Health First",
                description: "Your health is our priority. We create juices that not only taste great but also provide essential nutrients and antioxidants."
              },
              {
                icon: GlobeAltIcon,
                title: "Environmental Stewardship",
                description: "We're committed to sustainable practices, from sourcing ingredients to packaging, ensuring a better future for our planet."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg"
              >
                                 <div className="w-16 h-16 bg-leaf-light rounded-full flex items-center justify-center mx-auto mb-6">
                   <value.icon className="w-8 h-8 text-leaf-dark" />
                </div>
                <h3 className="text-xl font-semibold text-natural-900 mb-3">{value.title}</h3>
                <p className="text-natural-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-natural-600 max-w-2xl mx-auto">
              From a small family business to a trusted name in premium juices
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                year: "2002",
                title: "The Beginning",
                description: "Nature Harvest was founded with a simple mission: to bring pure, natural juice to families."
              },
              {
                year: "2008",
                title: "First Organic Certification",
                description: "We became one of the first juice companies to receive full organic certification."
              },
              {
                year: "2015",
                title: "National Expansion",
                description: "Our products became available nationwide, reaching millions of health-conscious consumers."
              },
              {
                year: "2020",
                title: "Sustainability Milestone",
                description: "Achieved 100% sustainable packaging and carbon-neutral operations."
              },
              {
                year: "2024",
                title: "Innovation Leader",
                description: "Leading the industry in natural juice innovation and sustainable practices."
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="flex-1 text-center">
                  <div className="bg-leaf-dark text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold">{milestone.year}</span>
                  </div>
                </div>
                <div className="flex-1 p-8">
                  <h3 className="text-2xl font-semibold text-natural-900 mb-2">{milestone.title}</h3>
                  <p className="text-natural-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-natural-600 max-w-2xl mx-auto">
              The passionate people behind Nature Harvest's success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                bio: "A passionate advocate for natural health and sustainable business practices.",
                avatar: "👩‍💼"
              },
              {
                name: "Michael Chen",
                role: "Head of Product Development",
                bio: "Expert in creating innovative juice blends that delight our customers.",
                avatar: "👨‍🔬"
              },
              {
                name: "Emma Rodriguez",
                role: "Sustainability Director",
                bio: "Leading our environmental initiatives and sustainable sourcing programs.",
                avatar: "👩‍🌾"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-natural-900 mb-2">{member.name}</h3>
                                 <p className="text-leaf-dark font-medium mb-3">{member.role}</p>
                <p className="text-natural-600">{member.bio}</p>
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
              Join Our Mission
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Be part of a movement towards healthier, more sustainable living
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <a href="/" className="bg-white text-logo-red px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-colors shadow-lg">
                Explore Our Products
              </a>
                             <a href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-logo-red transition-colors">
                Get in Touch
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
                <li><a href="/" className="hover:text-white transition-colors">Citrus Juices</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Apple Juices</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Berry Blends</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Tropical Mixes</a></li>
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