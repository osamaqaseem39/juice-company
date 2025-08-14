import React, { useState } from 'react';
import { Link } from '@remix-run/react';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  products: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  tagline?: string;
  image?: string;
  productImages: string[];
}

const brands: Brand[] = [
  {
    id: '1',
    name: 'Funtastic',
    logo: '/Funtastic Logo PET.jpg',
    image: '/images/products/funtastic-mango.png',
    description: 'Vibrant and fun fruit drinks that bring excitement to every sip. Our Funtastic brand delivers colorful, energetic flavors that appeal to young consumers and families alike.',
    products: ['Mango Flavoured Drink', 'Orange Flavoured Drink', 'Apple Flavoured Drink'],
    colors: {
      primary: '#FFD700', // Sun yellow
      secondary: '#F7941D', // Sun orange
      accent: '#2DBD30' // Sun green
    },
    features: ['Natural Ingredients', 'Vibrant Colors', 'Fun Packaging'],
    tagline: 'Where Fun Meets Flavor',
    productImages: [
      '/200ml Mockup Funtastic_Mango L.png',
      '/200ml Mockup Funtastic_Apple L.png',
      '/200ml Mockup Funtastic_Mango R.png',
      '/200ml Mockup Funtastic_Apple R.png',
      '/Funtastic 200ml Mockup A_B.png',
      '/Funtastic 200ml Mockup M_B.png',
      '/Funtastic 500ml Mockup.png',
      '/Funtastic 1 Litre Mockup.png',
      '/Funtastic 200ml Mango+Apple.png'
    ]
  },
  {
    id: '2',
    name: 'Freshlay',
    logo: '/FreshLay Logo PET.jpg',
    image: '/images/products/freshlay-mango.png',
    description: 'Premium fruit drinks with authentic taste and natural goodness. Freshlay represents our commitment to quality and freshness in every bottle.',
    products: ['Mango Fruit Drink', 'Guava Fruit Drink', 'Apple Fruit Drink'],
    colors: {
      primary: '#66BB44', // Leaf light
      secondary: '#FFD700', // Sun yellow
      accent: '#E11B22' // Primary red
    },
    features: ['8% Fruit Pulp', 'Natural Flavors', 'Premium Quality'],
    tagline: 'Where Taste Meets Nature',
    productImages: [
      '/Freshlay 200ml  mango_L.png',
      '/Freshlay 200ml apple_L.png',
      '/Freshlay 200ml  mango_R.png',
      '/Freshlay 200ml apple_R.png',
      '/200ml Mockup FreshLay_Apple R.png',
      '/200ml Mockup FreshLay_Mango R.png',
      '/200ml Mockup FreshLay_Guava R.png',
      '/200ml Mockup FreshLay_Peach R.png',
      '/FreshLay 200ml Mockup Mango L.png',
      '/FreshLay 200ml Mockup Peach L.png',
      '/FreshLay 200ml Mockup Guava L.png',
      '/FreshLay 200ml Mockup Apple L.png',
      '/125ml Mock FreshLay Mango L.png',
      '/125ml Mock FreshLay Apple L.png',
      '/125ml Mock FreshLay Apple R.png',
      '/125ml Mock FreshLay Mango R.png',
      '/FreshLay 250ml Mockup M-R.png',
      '/FreshLay 250ml Mockup A-R.png',
      '/FreshLay 250ml Mockup A-L.png',
      '/FreshLay 250ml Mockup M-L.png',
      '/250ml Mockup FreshLay_Mango R.png',
      '/250ml Mockup FreshLay_Apple R.png',
      '/250ml Mockup FreshLay_Mango.png',
      '/250ml Mockup FreshLay_Apple.png',
      '/FreshLay 200ml Mango+Apple+Prach+Guava Updated.png',
      '/FreshLay Both Waters.png'
    ]
  },
  {
    id: '3',
    name: 'Fusion',
    logo: '/Funtastic Logo PET.jpg',
    image: '/images/products/fusion-mango.png',
    description: 'Innovative diet drinks for health-conscious consumers. Fusion combines great taste with zero-calorie options for modern lifestyles.',
    products: ['Mango Diet Drink', 'Orange Diet Drink', 'Apple Diet Drink'],
    colors: {
      primary: '#007A3D', // Leaf dark
      secondary: '#FFD700', // Sun yellow
      accent: '#2DBD30' // Sun green
    },
    features: ['Zero Calories', 'Diet Friendly', 'Artificial Sweeteners'],
    tagline: 'Fusion of Health & Taste',
    productImages: [
      '/Fusion 200ml mango_L.png',
      '/Fusion 200ml mango_R.png'
    ]
  },
  {
    id: '4',
    name: 'Fruitsip',
    logo: '/FruitSip Logo PET.jpg',
    image: '/images/products/fruitsip-apple.png',
    description: 'Refreshing fruit drinks that capture the essence of nature. Fruitsip offers authentic fruit flavors in convenient, portable packaging.',
    products: ['Apple Fruit Drink', 'Mango Fruit Drink', 'Orange Fruit Drink'],
    colors: {
      primary: '#007A3D', // Leaf dark
      secondary: '#FFD700', // Sun yellow
      accent: '#E11B22' // Primary red
    },
    features: ['8% Fruit Juice', 'Natural Flavors', 'Refreshing Taste'],
    tagline: 'Taste the Fruit in Every Sip',
    productImages: [
      '/FruitSip Mango 200ml Mockup A.png',
      '/FruitSip Apple 200ml Mockup A.png',
      '/FruitSip 1_Litre Mockup.png'
    ]
  },
  {
    id: '5',
    name: 'Fabulous',
    logo: '/Fabulous Logo PET.jpg',
    image: '/images/products/fabulous-mango.png',
    description: 'Our premium brand delivering nature\'s best in every bottle. Fabulous represents our premium organic and sustainable juice offerings.',
    products: ['Premium Mango', 'Tropical Mix', 'Berry Blend'],
    colors: {
      primary: '#007A3D', // Leaf dark
      secondary: '#FFD700', // Sun yellow
      accent: '#E11B22' // Primary red
    },
    features: ['Organic Ingredients', 'Sustainable Packaging', 'Premium Quality'],
    tagline: 'Harvesting Nature\'s Best',
    productImages: [
      '/Fab 200ml mango_L.png',
      '/Fab 200ml Apple_L.png',
      '/Fab 200ml mango_R.png',
      '/Fab 200ml Apple_R.png',
      '/Fab Mango 125ml.png',
      '/250ml Mockup Fabulous New_Apple L.png',
      '/NH 1L Mocks Fabulous_Peach  C.png',
      '/NH 1L Mocks Fabulous_Mango.png',
      '/NH 1L Mocks Fabulous_Guava.png',
      '/NH 1L Mocks Fabulous_Apple A.png',
      '/Mockup 2L Fabulous_mango.png'
    ]
  }
];

const ProductCarousel: React.FC<{ images: string[]; brandName: string; brandColor: string }> = ({ images, brandName, brandColor }) => {
  const [validImages, setValidImages] = useState<string[]>([]);

  // Filter out invalid images and limit to 3 images
  React.useEffect(() => {
    const checkImages = async () => {
      const valid: string[] = [];
      for (const image of images.slice(0, 3)) { // Limit to first 3 images
        try {
          const response = await fetch(image);
          if (response.ok) {
            valid.push(image);
          }
        } catch (error) {
          console.warn(`Image not found: ${image}`);
        }
      }
      setValidImages(valid);
    };
    
    checkImages();
  }, [images]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Product Images - Marquee Effect */}
      <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12">
        {validImages.length > 0 ? (
          <div className="relative w-full h-full overflow-hidden">
            {/* Marquee Container */}
            <div className="flex animate-marquee items-center justify-center gap-8" style={{ animationIterationCount: 'infinite' }}>
              {/* First set of images */}
              <div className="flex gap-8 items-center justify-center min-w-max">
                {validImages.map((image, index) => (
                  <div 
                    key={`first-${index}`} 
                    className="flex-shrink-0 w-32 h-80 md:w-40 md:h-96 flex items-center justify-center rounded-lg relative overflow-hidden bg-white"
                  >
                    <img
                      src={image}
                      alt={`${brandName} Product ${index + 1}`}
                      className="w-full h-full object-contain transition-all duration-500 transform hover:scale-105"
                      onError={(e) => {
                        console.warn(`Failed to load image: ${image}`);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex gap-8 items-center justify-center min-w-max">
                {validImages.map((image, index) => (
                  <div 
                    key={`second-${index}`} 
                    className="flex-shrink-0 w-32 h-80 md:w-40 md:h-96 flex items-center justify-center rounded-lg relative overflow-hidden bg-white"
                  >
                    <img
                      src={image}
                      alt={`${brandName} Product ${index + 1}`}
                      className="w-full h-full object-contain transition-all duration-500 transform hover:scale-105"
                      onError={(e) => {
                        console.warn(`Failed to load image: ${image}`);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Third set for extra smooth infinite loop */}
              <div className="flex gap-8 items-center justify-center min-w-max">
                {validImages.map((image, index) => (
                  <div 
                    key={`third-${index}`} 
                    className="flex-shrink-0 w-32 h-80 md:w-40 md:h-96 flex items-center justify-center rounded-lg relative overflow-hidden bg-white"
                  >
                    <img
                      src={image}
                      alt={`${brandName} Product ${index + 1}`}
                      className="w-full h-full object-contain transition-all duration-500 transform hover:scale-105"
                      onError={(e) => {
                        console.warn(`Failed to load image: ${image}`);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-natural-500 flex items-center justify-center h-full">
            <div>
              <svg className="w-16 h-16 mx-auto mb-4 text-natural-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-poppins">No product images available</p>
            </div>
          </div>
        )}
      </div>

      {/* Brand Badge */}
      <div className="absolute top-4 left-4">
        <span className="bg-white text-natural-800 px-3 py-1 rounded-full text-xs font-poppins font-semibold shadow-lg">
          {brandName}
        </span>
      </div>
    </div>
  );
};

const BrandCard: React.FC<{ brand: Brand; index: number }> = ({ brand, index }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);


  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <section className="flex flex-col md:flex-row w-full max-w-[95vw] md:w-[900px] lg:w-[1200px] xl:w-[1600px] rounded-3xl overflow-hidden min-h-[400px] bg-white shadow-lg mb-8">
      {/* Content Section - Left Side */}
      <div className="w-full md:w-2/5 flex flex-col justify-center p-6 md:p-8 border-r border-gray-200">
        {/* Brand Logo */}
        <div className="mb-4">
          <img
            src={brand.logo}
            alt={`${brand.name} Logo`}
            className="h-16 w-auto object-contain"
          />
        </div>
        
        <h2 className="font-gazpacho text-2xl md:text-3xl font-black mb-3 md:mb-4 text-natural-900">{brand.name}</h2>
        <p className="font-poppins mb-4 md:mb-6 text-sm md:text-base text-natural-600 leading-relaxed">{brand.description}</p>
        
        {/* Products List */}
        <div className="mb-4">
          <h4 className="font-poppins font-semibold text-natural-800 mb-2 text-sm">Products:</h4>
          <div className="flex flex-wrap gap-2">
            {brand.products.slice(0, 3).map((product, idx) => (
              <span
                key={idx}
                className="font-poppins px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: brand.colors.accent }}
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {brand.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="font-poppins inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${brand.colors.accent}20`,
                  color: brand.colors.accent
                }}
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/brands/${brand.id}`}
          className="font-poppins px-4 py-2 md:px-6 md:py-3 rounded-full text-white font-semibold hover:opacity-90 transition w-full md:w-auto text-center"
          style={{ backgroundColor: brand.colors.accent }}
        >
          Explore {brand.name}
        </Link>
      </div>

      {/* Product Carousel Section - Right Side */}
      <div 
        className="w-full md:w-3/5 h-64 md:h-auto"
        style={{ backgroundColor: brand.colors.accent }}
      >
        <ProductCarousel 
          images={brand.productImages} 
          brandName={brand.name} 
          brandColor={brand.colors.accent}
        />
      </div>
    </section>
  );
};

const Brands: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#e7e9d4] to-white" style={{ paddingTop: '160px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 pt-16">
          <h2 className="font-gazpacho font-black mb-6 text-natural-900 text-2xl sm:text-4xl md:text-5xl">
            Our Premium Brands
          </h2>
          <p className="font-poppins text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-natural-600">
            Discover our diverse portfolio of juice brands, each crafted with unique flavors 
            and distinctive personalities that cater to different tastes and preferences.
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="font-gazpacho text-2xl font-black text-natural-800 mb-4">
              Ready to Partner with Our Brands?
            </h3>
            <p className="font-poppins text-natural-600 mb-6">
              Explore our complete brand portfolio and find the perfect partnership opportunity.
            </p>
            <Link
              to="/brands"
              className="inline-block px-8 py-3 bg-primary-500 text-white font-poppins font-semibold rounded-lg hover:bg-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              View All Brands
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands; 