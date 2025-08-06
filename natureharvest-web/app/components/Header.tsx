import { motion } from "framer-motion";

export default function Header() {
  return (
    <nav className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[98%] sm:w-[95%] max-w-7xl">
      <div className="bg-gray-50/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200/20 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-center">
          {/* Left side - Brand Logo */}
          <div className="flex items-center mr-8">
            <div className="text-center">
              <img src="/logo.png" alt="Nature Harvest" className="h-12 w-auto sm:h-16" />
            </div>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 justify-center flex-1">
            <a href="#products" className="text-gray-800 hover:text-red-600 transition-colors font-light text-base lg:text-lg font-poppins">
              Juices
            </a>
            <a href="#about" className="text-gray-800 hover:text-red-600 transition-colors font-light text-base lg:text-lg font-poppins">
              About
            </a>
            <a href="#contact" className="text-gray-800 hover:text-red-600 transition-colors font-light text-base lg:text-lg font-hurme">
              Contact
            </a>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4 ml-8">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-gray-800 font-light text-base lg:text-lg font-hurme">Discover</span>
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button
              className="border-2 border-red-600 text-red-600 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-light  text-sm sm:text-base lg:text-lg font-hurme cursor-pointer bg-transparent relative overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{
                backgroundImage: "linear-gradient(to bottom, #dc2626 0%, #dc2626 100%)",
                backgroundSize: "100% 0%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
                transition: "background-size 0.5s ease"
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundSize = "100% 100%";
                target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundSize = "100% 0%";
                target.style.color = "#dc2626";
              }}
            >
              Find Store
            </button>
            <button className="bg-gray-100/80 backdrop-blur-sm text-gray-800 p-2 sm:p-3 rounded-full hover:bg-gray-200/80 transition-all duration-300 hover:shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}