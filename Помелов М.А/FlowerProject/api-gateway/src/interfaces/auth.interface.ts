// Интерфейс для ответа валидации токена от auth-service
export interface TokenValidationResponse {
  valid: boolean;
  user?: {
    sub: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  error?: string;
} 