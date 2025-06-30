// Интерфейс для JWT payload
export interface JwtPayload {
  sub: number;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

// Интерфейс для результата валидации токена
export interface TokenValidationResult {
  valid: boolean;
  user?: {
    sub: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  error?: string;
} 