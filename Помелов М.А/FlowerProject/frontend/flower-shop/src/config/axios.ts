import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from './api';

// Создаем axios instance с базовой конфигурацией
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 30000, // 30 секунд таймаут
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor для добавления токена авторизации
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

// Response interceptor для обработки ошибок
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Обработка различных типов ошибок
    if (error.response) {
      // Сервер ответил с ошибкой (4xx, 5xx)
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен
      console.error('Network Error:', error.message);
    } else {
      // Ошибка при настройке запроса
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Типы для API ответов
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status?: number;
}

export interface AuthResponse {
  accessToken: string;
  message?: string;
}

export interface ErrorResponse {
  message: string;
  error?: string;
  status?: number;
  timestamp?: string;
}


export const api = {

  get: <T = unknown>(url: string, config = {}) => 
    apiClient.get<T, AxiosResponse<T>>(url, config),
  

  post: <T = unknown>(url: string, data = {}, config = {}) => 
    apiClient.post<T, AxiosResponse<T>>(url, data, config),
  

  put: <T = unknown>(url: string, data = {}, config = {}) => 
    apiClient.put<T, AxiosResponse<T>>(url, data, config),
  

  delete: <T = unknown>(url: string, config = {}) => 
    apiClient.delete<T, AxiosResponse<T>>(url, config),
  

  patch: <T = unknown>(url: string, data = {}, config = {}) => 
    apiClient.patch<T, AxiosResponse<T>>(url, data, config),
};

export default apiClient; 