// Интерфейс для ответа аутентификации
export interface AuthResponse {
  message: string;
  accessToken?: string;
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
} 