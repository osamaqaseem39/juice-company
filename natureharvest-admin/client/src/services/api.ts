import { client } from './graphqlClient';
import { useQuery, useMutation } from '@apollo/client';
import * as Queries from './graphql/queries';
import * as Mutations from './graphql/mutations';

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
  images?: string[];
  brand?: string;
  category?: string;
  subCategory?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  images?: string[];
  brandId?: string;
  categoryId?: string;
  tags?: string[];
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  images?: string[];
  brandId?: string;
  categoryId?: string;
  tags?: string[];
}

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
  message?: string;
  newsletterSubscribed?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  parent?: Category | string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory extends Category {}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  roles?: string[];
  isActive?: boolean;
}

export interface UpdateUserInput {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  roles?: string[];
  isActive?: boolean;
}

export interface Coupon {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxDiscountAmount?: number;
  expiryDate?: string;
  isActive: boolean;
  usedBy?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCouponInput {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxDiscountAmount?: number;
  expiryDate?: string | null;
  isActive?: boolean;
}

export interface UpdateCouponInput {
  code?: string;
  discountType?: 'percentage' | 'fixed';
  value?: number;
  minOrderValue?: number;
  maxDiscountAmount?: number;
  expiryDate?: string | null;
  isActive?: boolean;
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  shippingAddress?: Address;
  billingAddress?: Address;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingMethod: string;
  paymentMethod: string;
  trackingNumber?: string;
  placedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Company {
  _id: string;
  name: string;
  description: string;
  logoUrl?: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
  address: Address;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyInput {
  name: string;
  description: string;
  logoUrl?: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
  address: Address;
  status?: 'active' | 'inactive';
}

export interface UpdateCompanyInput {
  name?: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: Address;
  status?: 'active' | 'inactive';
}

// GraphQL API functions
export const blogApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_BLOGS }),
  getById: (id: string) => client.query({ query: Queries.GET_BLOG_BY_ID, variables: { id } }),
  getBySlug: (slug: string) => client.query({ query: Queries.GET_BLOG_BY_SLUG, variables: { slug } }),
  create: (data: CreateBlogInput) => client.mutate({ mutation: Mutations.CREATE_BLOG, variables: { input: data } }),
  update: (id: string, data: Partial<UpdateBlogInput>) => client.mutate({ mutation: Mutations.UPDATE_BLOG, variables: { id, input: data } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_BLOG, variables: { id } }),
};

export const authApi = {
  login: (data: LoginInput) => client.mutate({ mutation: Mutations.LOGIN, variables: data }),
  register: (data: RegisterInput) => client.mutate({ mutation: Mutations.REGISTER, variables: data }),
};

export const productApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_PRODUCTS }),
  getById: (id: string) => client.query({ query: Queries.GET_PRODUCT_BY_ID, variables: { id } }),
  create: (data: CreateProductInput) => client.mutate({ mutation: Mutations.CREATE_PRODUCT, variables: { input: data } }),
  update: (id: string, data: UpdateProductInput) => client.mutate({ mutation: Mutations.UPDATE_PRODUCT, variables: { id, input: data } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_PRODUCT, variables: { id } }),
};

export const serviceApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_SERVICES }),
  getById: (id: string) => client.query({ query: Queries.GET_SERVICE_BY_ID, variables: { id } }),
  create: (data: CreateServiceInput) => client.mutate({ mutation: Mutations.CREATE_SERVICE, variables: { input: data } }),
  update: (id: string, data: UpdateServiceInput) => client.mutate({ mutation: Mutations.UPDATE_SERVICE, variables: { id, input: data } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_SERVICE, variables: { id } }),
};

export const quoteApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_QUOTES }),
  getById: (id: string) => client.query({ query: Queries.GET_QUOTE_BY_ID, variables: { id } }),
  update: (id: string, data: { status: string }) => client.mutate({ mutation: Mutations.UPDATE_QUOTE, variables: { id, status: data.status } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_QUOTE, variables: { id } }),
};

export const supplierApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_SUPPLIERS }),
  getById: (id: string) => client.query({ query: Queries.GET_SUPPLIER_BY_ID, variables: { id } }),
};

export const brandApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_BRANDS }),
  getById: (id: string) => client.query({ query: Queries.GET_BRAND_BY_ID, variables: { id } }),
  create: (data: any) => client.mutate({ mutation: Mutations.CREATE_BRAND, variables: { input: data } }),
  update: (id: string, data: any) => client.mutate({ mutation: Mutations.UPDATE_BRAND, variables: { id, input: data } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_BRAND, variables: { id } }),
};

export const categoryApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_CATEGORIES }),
  getById: (id: string) => client.query({ query: Queries.GET_CATEGORY_BY_ID, variables: { id } }),
  create: (data: Partial<Category>) => client.mutate({ mutation: Mutations.CREATE_CATEGORY, variables: { input: data } }),
  update: (id: string, data: Partial<Category>) => client.mutate({ mutation: Mutations.UPDATE_CATEGORY, variables: { id, input: data } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_CATEGORY, variables: { id } }),
};

export const subcategoryApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_SUBCATEGORIES }),
  getById: (id: string) => client.query({ query: Queries.GET_SUBCATEGORY_BY_ID, variables: { id } }),
  create: (data: any) => client.mutate({ mutation: Mutations.CREATE_SUBCATEGORY, variables: { input: data } }),
  update: (id: string, data: any) => client.mutate({ mutation: Mutations.UPDATE_SUBCATEGORY, variables: { id, input: data } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_SUBCATEGORY, variables: { id } }),
  getNested: (parentId: string) => client.query({ query: Queries.GET_NESTED_SUBCATEGORIES, variables: { parentId } }),
};

export const userApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_USERS }),
  getById: (id: string) => client.query({ query: Queries.GET_USER_BY_ID, variables: { id } }),
  create: (data: CreateUserInput) => client.mutate({ mutation: Mutations.CREATE_USER, variables: { input: data } }),
  update: (id: string, data: UpdateUserInput) => client.mutate({ mutation: Mutations.UPDATE_USER, variables: { id, input: data } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_USER, variables: { id } }),
};

export const couponApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_COUPONS }),
  getById: (id: string) => client.query({ query: Queries.GET_COUPON_BY_ID, variables: { id } }),
  create: (data: CreateCouponInput) => client.mutate({ mutation: Mutations.CREATE_COUPON, variables: { input: data } }),
  update: (id: string, data: UpdateCouponInput) => client.mutate({ mutation: Mutations.UPDATE_COUPON, variables: { id, input: data } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_COUPON, variables: { id } }),
};

export const orderApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_ORDERS }),
  getById: (id: string) => client.query({ query: Queries.GET_ORDER_BY_ID, variables: { id } }),
  update: (id: string, data: Partial<Order>) => client.mutate({ mutation: Mutations.UPDATE_ORDER, variables: { id, input: data } }),
};

export const companyApi = {
  getAll: () => client.query({ query: Queries.GET_ALL_COMPANIES }),
  getById: (id: string) => client.query({ query: Queries.GET_COMPANY_BY_ID, variables: { id } }),
  create: (data: CreateCompanyInput) => client.mutate({ mutation: Mutations.CREATE_COMPANY, variables: { input: data } }),
  update: (id: string, data: UpdateCompanyInput) => client.mutate({ mutation: Mutations.UPDATE_COMPANY, variables: { id, input: data } }),
  delete: (id: string) => client.mutate({ mutation: Mutations.DELETE_COMPANY, variables: { id } }),
};

// React hooks for components
export const useBlogs = () => useQuery(Queries.GET_ALL_BLOGS);
export const useBlog = (id: string) => useQuery(Queries.GET_BLOG_BY_ID, { variables: { id } });
export const useBlogBySlug = (slug: string) => useQuery(Queries.GET_BLOG_BY_SLUG, { variables: { slug } });

export const useProducts = () => useQuery(Queries.GET_ALL_PRODUCTS);
export const useProduct = (id: string) => useQuery(Queries.GET_PRODUCT_BY_ID, { variables: { id } });

export const useServices = () => useQuery(Queries.GET_ALL_SERVICES);
export const useService = (id: string) => useQuery(Queries.GET_SERVICE_BY_ID, { variables: { id } });

export const useQuotes = () => useQuery(Queries.GET_ALL_QUOTES);
export const useQuote = (id: string) => useQuery(Queries.GET_QUOTE_BY_ID, { variables: { id } });

export const useSuppliers = () => useQuery(Queries.GET_ALL_SUPPLIERS);
export const useSupplier = (id: string) => useQuery(Queries.GET_SUPPLIER_BY_ID, { variables: { id } });

export const useBrands = () => useQuery(Queries.GET_ALL_BRANDS);
export const useBrand = (id: string) => useQuery(Queries.GET_BRAND_BY_ID, { variables: { id } });

export const useCategories = () => useQuery(Queries.GET_ALL_CATEGORIES);
export const useCategory = (id: string) => useQuery(Queries.GET_CATEGORY_BY_ID, { variables: { id } });

export const useSubcategories = () => useQuery(Queries.GET_ALL_SUBCATEGORIES);
export const useSubcategory = (id: string) => useQuery(Queries.GET_SUBCATEGORY_BY_ID, { variables: { id } });
export const useNestedSubcategories = (parentId: string) => useQuery(Queries.GET_NESTED_SUBCATEGORIES, { variables: { parentId } });

export const useUsers = () => useQuery(Queries.GET_ALL_USERS);
export const useUser = (id: string) => useQuery(Queries.GET_USER_BY_ID, { variables: { id } });

export const useCoupons = () => useQuery(Queries.GET_ALL_COUPONS);
export const useCoupon = (id: string) => useQuery(Queries.GET_COUPON_BY_ID, { variables: { id } });

export const useOrders = () => useQuery(Queries.GET_ALL_ORDERS);
export const useOrder = (id: string) => useQuery(Queries.GET_ORDER_BY_ID, { variables: { id } });

export const useCompanies = () => useQuery(Queries.GET_ALL_COMPANIES);
export const useCompany = (id: string) => useQuery(Queries.GET_COMPANY_BY_ID, { variables: { id } });

// Mutation hooks
export const useCreateBlog = () => useMutation(Mutations.CREATE_BLOG);
export const useUpdateBlog = () => useMutation(Mutations.UPDATE_BLOG);
export const useDeleteBlog = () => useMutation(Mutations.DELETE_BLOG);

export const useCreateProduct = () => useMutation(Mutations.CREATE_PRODUCT);
export const useUpdateProduct = () => useMutation(Mutations.UPDATE_PRODUCT);
export const useDeleteProduct = () => useMutation(Mutations.DELETE_PRODUCT);

export const useCreateService = () => useMutation(Mutations.CREATE_SERVICE);
export const useUpdateService = () => useMutation(Mutations.UPDATE_SERVICE);
export const useDeleteService = () => useMutation(Mutations.DELETE_SERVICE);

export const useUpdateQuote = () => useMutation(Mutations.UPDATE_QUOTE);
export const useDeleteQuote = () => useMutation(Mutations.DELETE_QUOTE);

export const useCreateBrand = () => useMutation(Mutations.CREATE_BRAND);
export const useUpdateBrand = () => useMutation(Mutations.UPDATE_BRAND);
export const useDeleteBrand = () => useMutation(Mutations.DELETE_BRAND);

export const useCreateCategory = () => useMutation(Mutations.CREATE_CATEGORY);
export const useUpdateCategory = () => useMutation(Mutations.UPDATE_CATEGORY);
export const useDeleteCategory = () => useMutation(Mutations.DELETE_CATEGORY);

export const useCreateSubcategory = () => useMutation(Mutations.CREATE_SUBCATEGORY);
export const useUpdateSubcategory = () => useMutation(Mutations.UPDATE_SUBCATEGORY);
export const useDeleteSubcategory = () => useMutation(Mutations.DELETE_SUBCATEGORY);

export const useCreateUser = () => useMutation(Mutations.CREATE_USER);
export const useUpdateUser = () => useMutation(Mutations.UPDATE_USER);
export const useDeleteUser = () => useMutation(Mutations.DELETE_USER);

export const useCreateCoupon = () => useMutation(Mutations.CREATE_COUPON);
export const useUpdateCoupon = () => useMutation(Mutations.UPDATE_COUPON);
export const useDeleteCoupon = () => useMutation(Mutations.DELETE_COUPON);

export const useUpdateOrder = () => useMutation(Mutations.UPDATE_ORDER);

export const useCreateCompany = () => useMutation(Mutations.CREATE_COMPANY);
export const useUpdateCompany = () => useMutation(Mutations.UPDATE_COMPANY);
export const useDeleteCompany = () => useMutation(Mutations.DELETE_COMPANY);

export const useLogin = () => useMutation(Mutations.LOGIN);
export const useRegister = () => useMutation(Mutations.REGISTER);