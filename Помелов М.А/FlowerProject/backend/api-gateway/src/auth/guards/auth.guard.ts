import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TokenValidationResponse } from '../../interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    this.logger.debug(`Проверка аутентификации для ${request.method} ${request.url}`);

    if (!token) {
      this.logger.warn(`Попытка доступа без токена: ${request.method} ${request.url}`);
      throw new UnauthorizedException('Access token is required');
    }

    try {
      const validationResult = await this.validateToken(token);
      
      if (!validationResult.valid) {
        this.logger.warn(`Токен невалиден: ${validationResult.error}`);
        throw new UnauthorizedException(validationResult.error || 'Invalid token');
      }
      
      if (validationResult.user) {
        request['user'] = validationResult.user;
        this.logger.debug(`Пользователь добавлен в request: ${validationResult.user.email}`);
      } else {
        this.logger.warn('Токен валиден, но данные пользователя отсутствуют');
        throw new UnauthorizedException('User data not found');
      }
    } catch (error) {
      this.logger.error(`Ошибка валидации токена: ${error.message}`);
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new UnauthorizedException('Token validation failed');
    }

    return true;
  }

  private async validateToken(token: string): Promise<TokenValidationResponse> {
    this.logger.debug(`Отправка запроса на валидацию токена: http://auth-service:3000/auth/validatetoken`);
    
    const response = await firstValueFrom(
      this.httpService.post<TokenValidationResponse>(
        'http://auth-service:3000/auth/validatetoken',
        {},
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          } 
        }
      )
    );
    
    this.logger.debug(`Ответ от auth-service: ${JSON.stringify(response.data)}`);
    return response.data;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
} 