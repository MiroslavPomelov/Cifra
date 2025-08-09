// API Service for frontend
import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Interfaces
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  shopId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Shop {
  id: number;
  name: string;
  description: string | null;
  email: string;
  address: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithShop extends Product {
  shop: Shop;
}

// Shop registration interfaces
export interface ShopRegistrationData {
  email: string;
  password: string;
  name: string;
  address: string;
  description?: string;
  phone?: string;
}

export interface ShopVerificationData extends ShopRegistrationData {
  code: string;
}

export interface ShopLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  accessToken?: string;
  shop?: {
    id: number;
    email: string;
    name: string;
    address: string;
  };
}

// API Service class
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.baseURL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.baseURL}/products/featured`);
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }

  async getProductsByShop(shopId: number): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.baseURL}/products/shop/${shopId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shop products:', error);
      throw error;
    }
  }

  // Shops
  async getShops(): Promise<Shop[]> {
    try {
      const response = await axios.get(`${this.baseURL}/shops`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shops:', error);
      throw error;
    }
  }

  async getShop(id: number): Promise<Shop> {
    try {
      const response = await axios.get(`${this.baseURL}/shops/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shop:', error);
      throw error;
    }
  }

  // Shop Authentication
  async registerShop(data: ShopRegistrationData): Promise<{ message: string }> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/shops/registration`, data);
      return response.data;
    } catch (error) {
      console.error('Error registering shop:', error);
      throw error;
    }
  }

  async verifyShop(data: ShopVerificationData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/shops/verify`, data);
      return response.data;
    } catch (error) {
      console.error('Error verifying shop:', error);
      throw error;
    }
  }

  async loginShop(data: ShopLoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/shops/login`, data);
      return response.data;
    } catch (error) {
      console.error('Error logging in shop:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
