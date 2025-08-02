import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-50" style={{ height: '100vh' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/herobg.jpg"
          alt="Nature Harvest Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center w-full max-w-8xl">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-4 w-full px-4 sm:px-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 border border-red-200 rounded-full"
            >
              <span className="text-xs sm:text-sm font-poppins font-light text-red-600">🌱 100% Natural Ingredients</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-gazpacho font-black leading-tight text-gray-900 px-2 sm:px-0"
            >
              <span>Welcome to</span>
              <span className="text-logo-green"> Nature</span>
              <span> Harvest</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 leading-relaxed font-poppins font-extralight w-full max-w-5xl mx-auto px-4 sm:px-0"
            >
              Experience the authentic taste of nature's finest fruits. Every bottle is crafted with care, 
              bringing you the purest flavors without compromise.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center px-4 sm:px-0"
            >
              <button className="group relative bg-logo-red text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-poppins font-light hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                <span className="relative z-10">Explore Our Collection</span>
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group border-2 border-logo-red text-logo-red px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-poppins font-light hover:bg-red-50 transition-all duration-300">
                Watch Our Story
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 pt-6 sm:pt-8 justify-center px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-900 font-poppins font-light text-xs sm:text-sm">No Artificial Preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-900 font-poppins font-light text-xs sm:text-sm">Fresh Daily</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-xs sm:text-sm font-poppins mb-1 sm:mb-2">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 h-2 sm:w-1 sm:h-3 bg-gray-400 rounded-full mt-1.5 sm:mt-2"
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 