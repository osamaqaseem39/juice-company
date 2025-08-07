import { client } from './graphqlClient';
import { useMutation, useQuery } from '@apollo/client';
import * as Queries from './graphql/queries';
import * as Mutations from './graphql/mutations';

// Enhanced API service with proper error handling and authentication
export class ApiService {
  private static instance: ApiService;
  private token: string | null = null;

  private constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  public clearToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  // Generic error handler
  private handleError(error: any): never {
    console.error('API Error:', error);
    
    if (error.graphQLErrors) {
      const graphQLError = error.graphQLErrors[0];
      throw new Error(graphQLError.message || 'GraphQL Error');
    }
    
    if (error.networkError) {
      throw new Error('Network Error: Please check your connection');
    }
    
    throw new Error(error.message || 'An unexpected error occurred');
  }

  // Authentication methods
  public async login(email: string, password: string) {
    try {
      const result = await client.mutate({
        mutation: Mutations.LOGIN,
        variables: { email, password }
      });
      
      const { token, user } = result.data.login;
      this.setToken(token);
      return { token, user };
    } catch (error) {
      this.handleError(error);
    }
  }

  public async register(userData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.REGISTER,
        variables: { input: userData }
      });
      
      const { token, user } = result.data.register;
      this.setToken(token);
      return { token, user };
    } catch (error) {
      this.handleError(error);
    }
  }

  // Blog methods
  public async getBlogs() {
    try {
      const result = await client.query({
        query: Queries.GET_ALL_BLOGS
      });
      return result.data.blogs;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getBlog(id: string) {
    try {
      const result = await client.query({
        query: Queries.GET_BLOG_BY_ID,
        variables: { id }
      });
      return result.data.blog;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async createBlog(blogData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.CREATE_BLOG,
        variables: { input: blogData }
      });
      return result.data.createBlog;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateBlog(id: string, blogData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.UPDATE_BLOG,
        variables: { id, input: blogData }
      });
      return result.data.updateBlog;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteBlog(id: string) {
    try {
      const result = await client.mutate({
        mutation: Mutations.DELETE_BLOG,
        variables: { id }
      });
      return result.data.deleteBlog;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Product methods
  public async getProducts() {
    try {
      const result = await client.query({
        query: Queries.GET_ALL_PRODUCTS
      });
      return result.data.products;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getProduct(id: string) {
    try {
      const result = await client.query({
        query: Queries.GET_PRODUCT_BY_ID,
        variables: { id }
      });
      return result.data.product;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async createProduct(productData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.CREATE_PRODUCT,
        variables: { input: productData }
      });
      return result.data.createProduct;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateProduct(id: string, productData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.UPDATE_PRODUCT,
        variables: { id, input: productData }
      });
      return result.data.updateProduct;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteProduct(id: string) {
    try {
      const result = await client.mutate({
        mutation: Mutations.DELETE_PRODUCT,
        variables: { id }
      });
      return result.data.deleteProduct;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Brand methods
  public async getBrands() {
    try {
      const result = await client.query({
        query: Queries.GET_ALL_BRANDS
      });
      return result.data.brands;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getBrand(id: string) {
    try {
      const result = await client.query({
        query: Queries.GET_BRAND_BY_ID,
        variables: { id }
      });
      return result.data.brand;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async createBrand(brandData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.CREATE_BRAND,
        variables: { input: brandData }
      });
      return result.data.createBrand;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateBrand(id: string, brandData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.UPDATE_BRAND,
        variables: { id, input: brandData }
      });
      return result.data.updateBrand;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteBrand(id: string) {
    try {
      const result = await client.mutate({
        mutation: Mutations.DELETE_BRAND,
        variables: { id }
      });
      return result.data.deleteBrand;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Category methods
  public async getCategories() {
    try {
      const result = await client.query({
        query: Queries.GET_ALL_CATEGORIES
      });
      return result.data.categories;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getCategory(id: string) {
    try {
      const result = await client.query({
        query: Queries.GET_CATEGORY_BY_ID,
        variables: { id }
      });
      return result.data.category;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async createCategory(categoryData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.CREATE_CATEGORY,
        variables: { input: categoryData }
      });
      return result.data.createCategory;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateCategory(id: string, categoryData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.UPDATE_CATEGORY,
        variables: { id, input: categoryData }
      });
      return result.data.updateCategory;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteCategory(id: string) {
    try {
      const result = await client.mutate({
        mutation: Mutations.DELETE_CATEGORY,
        variables: { id }
      });
      return result.data.deleteCategory;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Service methods
  public async getServices() {
    try {
      const result = await client.query({
        query: Queries.GET_ALL_SERVICES
      });
      return result.data.services;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getService(id: string) {
    try {
      const result = await client.query({
        query: Queries.GET_SERVICE_BY_ID,
        variables: { id }
      });
      return result.data.service;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async createService(serviceData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.CREATE_SERVICE,
        variables: { input: serviceData }
      });
      return result.data.createService;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateService(id: string, serviceData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.UPDATE_SERVICE,
        variables: { id, input: serviceData }
      });
      return result.data.updateService;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteService(id: string) {
    try {
      const result = await client.mutate({
        mutation: Mutations.DELETE_SERVICE,
        variables: { id }
      });
      return result.data.deleteService;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Quote methods
  public async getQuotes() {
    try {
      const result = await client.query({
        query: Queries.GET_ALL_QUOTES
      });
      return result.data.quotes;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getQuote(id: string) {
    try {
      const result = await client.query({
        query: Queries.GET_QUOTE_BY_ID,
        variables: { id }
      });
      return result.data.quote;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateQuote(id: string, status: string) {
    try {
      const result = await client.mutate({
        mutation: Mutations.UPDATE_QUOTE,
        variables: { id, status }
      });
      return result.data.updateQuote;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteQuote(id: string) {
    try {
      const result = await client.mutate({
        mutation: Mutations.DELETE_QUOTE,
        variables: { id }
      });
      return result.data.deleteQuote;
    } catch (error) {
      this.handleError(error);
    }
  }

  // User methods
  public async getUsers() {
    try {
      const result = await client.query({
        query: Queries.GET_ALL_USERS
      });
      return result.data.users;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getUser(id: string) {
    try {
      const result = await client.query({
        query: Queries.GET_USER_BY_ID,
        variables: { id }
      });
      return result.data.user;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async createUser(userData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.CREATE_USER,
        variables: { input: userData }
      });
      return result.data.createUser;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateUser(id: string, userData: any) {
    try {
      const result = await client.mutate({
        mutation: Mutations.UPDATE_USER,
        variables: { id, input: userData }
      });
      return result.data.updateUser;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteUser(id: string) {
    try {
      const result = await client.mutate({
        mutation: Mutations.DELETE_USER,
        variables: { id }
      });
      return result.data.deleteUser;
    } catch (error) {
      this.handleError(error);
    }
  }
}

// Export singleton instance
export const apiService = ApiService.getInstance();

// React hooks for components
export const useApiService = () => {
  return {
    // Authentication
    login: (email: string, password: string) => apiService.login(email, password),
    register: (userData: any) => apiService.register(userData),
    logout: () => apiService.clearToken(),
    isAuthenticated: () => apiService.isAuthenticated(),

    // Blogs
    getBlogs: () => apiService.getBlogs(),
    getBlog: (id: string) => apiService.getBlog(id),
    createBlog: (data: any) => apiService.createBlog(data),
    updateBlog: (id: string, data: any) => apiService.updateBlog(id, data),
    deleteBlog: (id: string) => apiService.deleteBlog(id),

    // Products
    getProducts: () => apiService.getProducts(),
    getProduct: (id: string) => apiService.getProduct(id),
    createProduct: (data: any) => apiService.createProduct(data),
    updateProduct: (id: string, data: any) => apiService.updateProduct(id, data),
    deleteProduct: (id: string) => apiService.deleteProduct(id),

    // Brands
    getBrands: () => apiService.getBrands(),
    getBrand: (id: string) => apiService.getBrand(id),
    createBrand: (data: any) => apiService.createBrand(data),
    updateBrand: (id: string, data: any) => apiService.updateBrand(id, data),
    deleteBrand: (id: string) => apiService.deleteBrand(id),

    // Categories
    getCategories: () => apiService.getCategories(),
    getCategory: (id: string) => apiService.getCategory(id),
    createCategory: (data: any) => apiService.createCategory(data),
    updateCategory: (id: string, data: any) => apiService.updateCategory(id, data),
    deleteCategory: (id: string) => apiService.deleteCategory(id),

    // Services
    getServices: () => apiService.getServices(),
    getService: (id: string) => apiService.getService(id),
    createService: (data: any) => apiService.createService(data),
    updateService: (id: string, data: any) => apiService.updateService(id, data),
    deleteService: (id: string) => apiService.deleteService(id),

    // Quotes
    getQuotes: () => apiService.getQuotes(),
    getQuote: (id: string) => apiService.getQuote(id),
    updateQuote: (id: string, status: string) => apiService.updateQuote(id, status),
    deleteQuote: (id: string) => apiService.deleteQuote(id),

    // Users
    getUsers: () => apiService.getUsers(),
    getUser: (id: string) => apiService.getUser(id),
    createUser: (data: any) => apiService.createUser(data),
    updateUser: (id: string, data: any) => apiService.updateUser(id, data),
    deleteUser: (id: string) => apiService.deleteUser(id),
  };
};

// GraphQL hooks for reactive data
export const useBlogs = () => useQuery(Queries.GET_ALL_BLOGS);
export const useBlog = (id: string) => useQuery(Queries.GET_BLOG_BY_ID, { variables: { id } });
export const useProducts = () => useQuery(Queries.GET_ALL_PRODUCTS);
export const useProduct = (id: string) => useQuery(Queries.GET_PRODUCT_BY_ID, { variables: { id } });
export const useBrands = () => useQuery(Queries.GET_ALL_BRANDS);
export const useBrand = (id: string) => useQuery(Queries.GET_BRAND_BY_ID, { variables: { id } });
export const useCategories = () => useQuery(Queries.GET_ALL_CATEGORIES);
export const useCategory = (id: string) => useQuery(Queries.GET_CATEGORY_BY_ID, { variables: { id } });
export const useServices = () => useQuery(Queries.GET_ALL_SERVICES);
export const useService = (id: string) => useQuery(Queries.GET_SERVICE_BY_ID, { variables: { id } });
export const useQuotes = () => useQuery(Queries.GET_ALL_QUOTES);
export const useQuote = (id: string) => useQuery(Queries.GET_QUOTE_BY_ID, { variables: { id } });
export const useUsers = () => useQuery(Queries.GET_ALL_USERS);
export const useUser = (id: string) => useQuery(Queries.GET_USER_BY_ID, { variables: { id } });

// Mutation hooks
export const useCreateBlog = () => useMutation(Mutations.CREATE_BLOG);
export const useUpdateBlog = () => useMutation(Mutations.UPDATE_BLOG);
export const useDeleteBlog = () => useMutation(Mutations.DELETE_BLOG);
export const useCreateProduct = () => useMutation(Mutations.CREATE_PRODUCT);
export const useUpdateProduct = () => useMutation(Mutations.UPDATE_PRODUCT);
export const useDeleteProduct = () => useMutation(Mutations.DELETE_PRODUCT);
export const useCreateBrand = () => useMutation(Mutations.CREATE_BRAND);
export const useUpdateBrand = () => useMutation(Mutations.UPDATE_BRAND);
export const useDeleteBrand = () => useMutation(Mutations.DELETE_BRAND);
export const useCreateCategory = () => useMutation(Mutations.CREATE_CATEGORY);
export const useUpdateCategory = () => useMutation(Mutations.UPDATE_CATEGORY);
export const useDeleteCategory = () => useMutation(Mutations.DELETE_CATEGORY);
export const useCreateService = () => useMutation(Mutations.CREATE_SERVICE);
export const useUpdateService = () => useMutation(Mutations.UPDATE_SERVICE);
export const useDeleteService = () => useMutation(Mutations.DELETE_SERVICE);
export const useUpdateQuote = () => useMutation(Mutations.UPDATE_QUOTE);
export const useDeleteQuote = () => useMutation(Mutations.DELETE_QUOTE);
export const useCreateUser = () => useMutation(Mutations.CREATE_USER);
export const useUpdateUser = () => useMutation(Mutations.UPDATE_USER);
export const useDeleteUser = () => useMutation(Mutations.DELETE_USER);
export const useLogin = () => useMutation(Mutations.LOGIN);
export const useRegister = () => useMutation(Mutations.REGISTER); 

  // TODO: Implement GraphQL queries and mutations for flavors
  // Flavor hooks
  export const useFlavors = () => useQuery(Queries.GET_ALL_FLAVORS);
  export const useFlavor = (id: string) => useQuery(Queries.GET_FLAVOR_BY_ID, { variables: { id } });
  export const useFlavorsByBrand = (brandId: string) => useQuery(Queries.GET_FLAVORS_BY_BRAND, { variables: { brandId } });

  // TODO: Implement GraphQL queries and mutations for sizes
  // Size hooks
  export const useSizes = () => useQuery(Queries.GET_ALL_SIZES);
  export const useSize = (id: string) => useQuery(Queries.GET_SIZE_BY_ID, { variables: { id } });

  // TODO: Implement GraphQL mutations for flavors
  // Flavor mutation hooks
  export const useCreateFlavor = () => useMutation(Mutations.CREATE_FLAVOR);
  export const useUpdateFlavor = () => useMutation(Mutations.UPDATE_FLAVOR);
  export const useDeleteFlavor = () => useMutation(Mutations.DELETE_FLAVOR);
  export const useAddSizeToFlavor = () => useMutation(Mutations.ADD_SIZE_TO_FLAVOR);
  export const useUpdateSizeInFlavor = () => useMutation(Mutations.UPDATE_SIZE_IN_FLAVOR);
  export const useRemoveSizeFromFlavor = () => useMutation(Mutations.REMOVE_SIZE_FROM_FLAVOR);

  // TODO: Implement GraphQL mutations for sizes
  // Size mutation hooks
  export const useCreateSize = () => useMutation(Mutations.CREATE_SIZE);
  export const useUpdateSize = () => useMutation(Mutations.UPDATE_SIZE);
  export const useDeleteSize = () => useMutation(Mutations.DELETE_SIZE); 