// Import REST API functions
import { 
  authApi, 
  blogApi, 
  productApi, 
  brandApi, 
  categoryApi, 
  subcategoryApi, 
  serviceApi, 
  quoteApi, 
  flavorApi, 
  supplierApi,
  userApi,
  healthApi
} from './restApi';

// Import GraphQL hooks
import {
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
  useBrands,
  useBrand,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useProducts,
  useProduct,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCategories,
  useCategory,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
  useBlogs,
  useBlog,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useServices,
  useService,
  useCreateFlavor,
  useUpdateFlavor,
  useDeleteFlavor,
  useFlavors,
  useFlavor,
  useCreateSubcategory,
  useUpdateSubcategory,
  useDeleteSubcategory,
  useSubcategories,
  useSubcategory,
  useSubcategoriesByCategory,
  useCreateQuote,
  useUpdateQuote,
  useDeleteQuote,
  useQuotes,
  useQuote,
  useSuppliers,
  useSupplier,
  useUsers,
  useUser,
  useRemoveUser,
  useFileUpload
} from '../hooks';

// Type definitions
export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  featuredImage?: string;
  slug?: string;
  tags?: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogInput {
  title: string;
  content: string;
  author?: string;
  featuredImage?: string;
  slug?: string;
  tags?: string[];
  status?: string;
}

export interface UpdateBlogInput {
  title?: string;
  content?: string;
  author?: string;
  featuredImage?: string;
  tags?: string[];
  status?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  username: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  brand?: string;
  featuredImage?: string;
  images?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  brand?: string;
  featuredImage?: string;
  images?: string[];
  isActive?: boolean;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  subcategory?: string;
  brand?: string;
  featuredImage?: string;
  images?: string[];
  isActive?: boolean;
}

export interface Brand {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBrandInput {
  name: string;
  logo?: string;
  description?: string;
}

export interface UpdateBrandInput {
  name?: string;
  logo?: string;
  description?: string;
}

export interface Category {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  parent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryInput {
  name: string;
  image?: string;
  description?: string;
  parent?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  image?: string;
  description?: string;
  parent?: string;
}

export interface SubCategory extends Category {}

export interface Service {
  _id: string;
  title: string;
  description: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceInput {
  title: string;
  description: string;
  featuredImage?: string;
}

export interface UpdateServiceInput {
  title?: string;
  description?: string;
  featuredImage?: string;
}

export interface Quote {
  _id: string;
  name: string;
  email: string;
  phone: string;
  details: string;
  image?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateQuoteInput {
  status: string;
}

// Flavor types
export interface FlavorNutritionalInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  vitaminC?: number;
  potassium?: number;
}

export interface FlavorSeasonality {
  startMonth?: number;
  endMonth?: number;
}

export interface FlavorSize {
  _id?: string;
  sizeLabel: string;
  price: number;
  imageUrl?: string;
  stock: number;
  barcode?: string;
  weight: number;
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
  };
  isAvailable: boolean;
}

export interface Flavor {
  _id: string;
  brandId: string;
  brand?: Brand;
  name: string;
  description?: string;
  imageUrl?: string;
  flavorProfile: string;
  ingredients?: string[];
  nutritionalInfo?: FlavorNutritionalInfo;
  allergens?: string[];
  certifications?: string[];
  sizes?: FlavorSize[];
  tags?: string[];
  featured: boolean;
  status: string;
  seasonality?: FlavorSeasonality;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFlavorInput {
  brandId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  flavorProfile: string;
  ingredients?: string[];
  nutritionalInfo?: FlavorNutritionalInfo;
  allergens?: string[];
  certifications?: string[];
  sizes?: FlavorSize[];
  tags?: string[];
  featured?: boolean;
  status?: string;
  seasonality?: FlavorSeasonality;
}

export interface UpdateFlavorInput {
  brandId?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  flavorProfile?: string;
  ingredients?: string[];
  nutritionalInfo?: FlavorNutritionalInfo;
  allergens?: string[];
  certifications?: string[];
  sizes?: FlavorSize[];
  tags?: string[];
  featured?: boolean;
  status?: string;
  seasonality?: FlavorSeasonality;
}

// Supplier interfaces
export interface SupplierRequest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  jobTitle: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  ingredientsSupplied: string;
  foodSafetyAccreditations: string;
  brochure?: string;
  website?: string;
  message: string;
  newsletterSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Export all API functions
export {
  authApi,
  blogApi,
  productApi,
  brandApi,
  categoryApi,
  subcategoryApi,
  serviceApi,
  quoteApi,
  flavorApi,
  supplierApi,
  userApi,
  healthApi
};

// Export GraphQL hooks
export {
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
  useBrands,
  useBrand,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useProducts,
  useProduct,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCategories,
  useCategory,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
  useBlogs,
  useBlog,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useServices,
  useService,
  useCreateFlavor,
  useUpdateFlavor,
  useDeleteFlavor,
  useFlavors,
  useFlavor,
  useCreateSubcategory,
  useUpdateSubcategory,
  useDeleteSubcategory,
  useSubcategories,
  useSubcategory,
  useSubcategoriesByCategory,
  useCreateQuote,
  useUpdateQuote,
  useDeleteQuote,
  useQuotes,
  useQuote,
  useSuppliers,
  useSupplier,
  useUsers,
  useUser,
  useRemoveUser,
  useFileUpload
};

// Default export for convenience
const api = {
  auth: authApi,
  blogs: blogApi,
  products: productApi,
  brands: brandApi,
  categories: categoryApi,
  subcategories: subcategoryApi,
  services: serviceApi,
  quotes: quoteApi,
  flavors: flavorApi,
  health: healthApi
};

export default api;