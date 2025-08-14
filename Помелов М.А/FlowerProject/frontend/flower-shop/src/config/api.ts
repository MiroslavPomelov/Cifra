
export const API_CONFIG = {
  // Это база
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:80',
  
  // Auth 
  AUTH: {
    LOGIN: '/auth/login',
    REGISTRATION: '/auth/registration',
    VERIFY: '/auth/verify',
    VALIDATE_TOKEN: '/auth/validatetoken',
    // Эндпоинты для магазинов
    SHOP_LOGIN: '/auth/shops/login',
    SHOP_REGISTRATION: '/auth/shops/registration',
    SHOP_VERIFY: '/auth/shops/verify',
  },
  
  // Users 
  USERS: {
    BASE: '/users',
    PROFILE: (id: number) => `/users/${id}`,
    UPDATE_PROFILE: (id: number) => `/users/${id}`,
    ORDERS: (id: number) => `/users/${id}/orders`,
    WITH_FAVOURITES: (id: number) => `/users/${id}/with-favourites`,
    FAVOURITES: (id: number) => `/users/${id}/favourites`,
    FAVOURITES_CHECK: (userId: number, productId: number) => `/users/${userId}/favourites/check/${productId}`,
  },
  
  // Shops 
  SHOPS: {
    BASE: '/shops',
  },
  
  // Products 
  PRODUCTS: {
    BASE: '/products',
  },
  
  // Payment 
  PAYMENT: {
    PROCESS: '/payment/process',
    STATUS: (id: string) => `/payment/status/${id}`,
  },
  
  // Order 
  ORDER: {
    BASE: '/order',
  },
};


export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};


export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}; 