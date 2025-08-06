// API Configuration
export const API_CONFIG = {
  // Base URL for API Gateway
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:80',
  
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTRATION: '/auth/registration',
    VERIFY: '/auth/verify',
    VALIDATE_TOKEN: '/auth/validatetoken',
  },
  
  // Users endpoints
  USERS: {
    BASE: '/users',
    WITH_FAVOURITES: (id: number) => `/users/${id}/with-favourites`,
    FAVOURITES: (id: number) => `/users/${id}/favourites`,
    FAVOURITES_CHECK: (userId: number, productId: number) => `/users/${userId}/favourites/check/${productId}`,
  },
  
  // Shops endpoints
  SHOPS: {
    BASE: '/shops',
  },
  
  // Products endpoints
  PRODUCTS: {
    BASE: '/products',
  },
  
  // Payment endpoints
  PAYMENT: {
    PROCESS: '/payment/process',
    STATUS: (id: string) => `/payment/status/${id}`,
  },
  
  // Order endpoints
  ORDER: {
    BASE: '/order',
  },
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}; 