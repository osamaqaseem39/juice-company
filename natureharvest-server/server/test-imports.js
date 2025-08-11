console.log('Testing imports...');

try {
  console.log('Testing authController...');
  const authController = require('./controllers/authController');
  console.log('authController functions:', Object.keys(authController));
  
  console.log('Testing auth routes...');
  const authRoutes = require('./routes/auth');
  console.log('authRoutes loaded successfully');
  
  console.log('Testing other controllers...');
  const brandController = require('./controllers/brandController');
  const categoryController = require('./controllers/categoryController');
  const subcategoryController = require('./controllers/subcategoryController');
  const productController = require('./controllers/productController');
  const flavorController = require('./controllers/flavorController');
  const sizeController = require('./controllers/sizeController');
  const quoteController = require('./controllers/quoteController');
  const serviceController = require('./controllers/serviceController');
  const supplierController = require('./controllers/supplierController');
  
  console.log('All controllers loaded successfully!');
  
  console.log('Testing middleware...');
  const auth = require('./middleware/auth');
  const uploadBrandCategoryImage = require('./middleware/uploadBrandCategoryImage');
  const uploadBrochure = require('./middleware/uploadBrochure');
  
  console.log('All middleware loaded successfully!');
  
  console.log('Testing models...');
  const User = require('./models/User');
  const Product = require('./models/Product');
  const Flavor = require('./models/Flavor');
  const Size = require('./models/Size');
  const Brand = require('./models/Brand');
  const Category = require('./models/Category');
  const SubCategory = require('./models/SubCategory');
  const Blog = require('./models/Blog');
  const Service = require('./models/Service');
  const SupplierRequest = require('./models/SupplierRequest');
  const Quote = require('./models/Quote');
  
  console.log('All models loaded successfully!');
  
  console.log('All imports successful!');
  
} catch (error) {
  console.error('Import error:', error.message);
  console.error('Stack:', error.stack);
} 