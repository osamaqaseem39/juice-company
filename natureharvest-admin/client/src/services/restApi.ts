import axios from 'axios';

// Base API configuration - MUST be set in Vercel environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
  throw new Error('REACT_APP_API_URL environment variable is required. Please set it in your Vercel environment variables.');
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Type definitions (reusing from api.ts)
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
  gallery?: string[];
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
  gallery?: string[];
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
  gallery?: string[];
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

// REST API functions
export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/login', data);
    return response.data;
  },
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/register', data);
    return response.data;
  },
};

export const blogApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/blogs');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/blogs/${id}`);
    return response.data;
  },
  getBySlug: async (slug: string) => {
    const response = await apiClient.get(`/api/blogs/${slug}`);
    return response.data;
  },
  create: async (data: CreateBlogInput) => {
    const response = await apiClient.post('/api/blogs', data);
    return response.data;
  },
  update: async (id: string, data: UpdateBlogInput) => {
    const response = await apiClient.put(`/api/blogs/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/blogs/${id}`);
    return response.data;
  },
};

export const productApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/products');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },
  getByCategory: async (categoryId: string) => {
    const response = await apiClient.get(`/api/products/category/${categoryId}`);
    return response.data;
  },
  getBySubcategory: async (subcategoryId: string) => {
    const response = await apiClient.get(`/api/products/subcategory/${subcategoryId}`);
    return response.data;
  },
  query: async (params: any) => {
    const response = await apiClient.get('/api/products/query', { params });
    return response.data;
  },
  create: async (data: CreateProductInput) => {
    const response = await apiClient.post('/api/products', data);
    return response.data;
  },
  update: async (id: string, data: UpdateProductInput) => {
    const response = await apiClient.put(`/api/products/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/products/${id}`);
    return response.data;
  },
};

export const brandApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/brands');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/brands/${id}`);
    return response.data;
  },
  create: async (data: CreateBrandInput) => {
    const response = await apiClient.post('/api/brands', data);
    return response.data;
  },
  update: async (id: string, data: UpdateBrandInput) => {
    const response = await apiClient.put(`/api/brands/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/brands/${id}`);
    return response.data;
  },
};

export const categoryApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/categories');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/categories/${id}`);
    return response.data;
  },
  getNested: async () => {
    const response = await apiClient.get('/api/categories/nested');
    return response.data;
  },
  create: async (data: CreateCategoryInput) => {
    const response = await apiClient.post('/api/categories', data);
    return response.data;
  },
  update: async (id: string, data: UpdateCategoryInput) => {
    const response = await apiClient.put(`/api/categories/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/categories/${id}`);
    return response.data;
  },
};

export const subcategoryApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/subcategories');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/subcategories/${id}`);
    return response.data;
  },
  getNested: async () => {
    const response = await apiClient.get('/api/subcategories/nested');
    return response.data;
  },
  create: async (data: CreateCategoryInput) => {
    const response = await apiClient.post('/api/subcategories', data);
    return response.data;
  },
  update: async (id: string, data: UpdateCategoryInput) => {
    const response = await apiClient.put(`/api/subcategories/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/subcategories/${id}`);
    return response.data;
  },
};

export const serviceApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/services');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/services/${id}`);
    return response.data;
  },
  create: async (data: CreateServiceInput) => {
    const response = await apiClient.post('/api/services', data);
    return response.data;
  },
  update: async (id: string, data: UpdateServiceInput) => {
    const response = await apiClient.put(`/api/services/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/services/${id}`);
    return response.data;
  },
};

export const quoteApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/quotes');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/quotes/${id}`);
    return response.data;
  },
  update: async (id: string, data: UpdateQuoteInput) => {
    const response = await apiClient.patch(`/api/quotes/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/quotes/${id}`);
    return response.data;
  },
};

export const flavorApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/api/flavors', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/flavors/${id}`);
    return response.data;
  },
  getByBrand: async (brandId: string) => {
    const response = await apiClient.get(`/api/flavors/brand/${brandId}`);
    return response.data;
  },
  create: async (data: CreateFlavorInput) => {
    const response = await apiClient.post('/api/flavors', data);
    return response.data;
  },
  update: async (id: string, data: UpdateFlavorInput) => {
    const response = await apiClient.put(`/api/flavors/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/flavors/${id}`);
    return response.data;
  },
  addSize: async (flavorId: string, size: FlavorSize) => {
    const response = await apiClient.post(`/api/flavors/${flavorId}/sizes`, size);
    return response.data;
  },
  updateSize: async (flavorId: string, sizeId: string, size: FlavorSize) => {
    const response = await apiClient.put(`/api/flavors/${flavorId}/sizes/${sizeId}`, size);
    return response.data;
  },
  deleteSize: async (flavorId: string, sizeId: string) => {
    const response = await apiClient.delete(`/api/flavors/${flavorId}/sizes/${sizeId}`);
    return response.data;
  },
};

export const supplierApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/suppliers');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/suppliers/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post('/api/suppliers', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/api/suppliers/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/suppliers/${id}`);
    return response.data;
  },
};

export const userApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/users');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/users/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post('/api/users', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/api/users/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/users/${id}`);
    return response.data;
  },
};

// Health check
export const healthApi = {
  check: async () => {
    const response = await apiClient.get('/');
    return response.data;
  },
};

export default apiClient; 