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

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface UserProfileData {
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  orderDate: string;
  deliveryAddress: string;
  items: Array<{
    id: number;
    productName: string;
    quantity: number;
    price: number;
    imageUrl?: string;
  }>;
  shopName: string;
}


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

  async createProduct(data: CreateProductPayload): Promise<Product> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const response = await axios.post(`${this.baseURL}/products`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id: number, data: Partial<CreateProductPayload>): Promise<Product> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const response = await axios.put(`${this.baseURL}/products/${id}`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      await axios.delete(`${this.baseURL}/products/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
    } catch (error) {
      console.error('Error deleting product:', error);
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
      // Отправляем только разрешённые полям DTO auth-service (email, password, name, address)
      const payload = {
        email: data.email,
        password: data.password,
        name: data.name,
        address: data.address,
      };
      const response = await axios.post(`${this.baseURL}/auth/shops/registration`, payload);
      return response.data;
    } catch (error) {
      console.error('Error registering shop:', error);
      throw error;
    }
  }

  async verifyShop(data: ShopVerificationData): Promise<AuthResponse> {
    try {
      // Отправляем только разрешённые поля (email, password, name, address, code)
      const payload = {
        email: data.email,
        password: data.password,
        name: data.name,
        address: data.address,
        code: data.code,
      };
      const response = await axios.post(`${this.baseURL}/auth/shops/verify`, payload);
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

  // User profile methods
  async getUserProfile(userId: number, token: string): Promise<UserProfileData> {
    try {
      const response = await axios.get(`${this.baseURL}/users/${userId}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async updateUserProfile(userId: number, data: UserProfileData, token: string): Promise<UserProfileData> {
    try {
      const response = await axios.put(`${this.baseURL}/users/${userId}/profile`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  async getUserOrders(userId: number, token: string): Promise<UserOrder[]> {
    try {
      const response = await axios.get(`${this.baseURL}/users/${userId}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
