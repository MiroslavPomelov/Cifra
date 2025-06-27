import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: number;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const secretKey = this.configService.get('ENV_KEY');

    this.logger.debug(`Проверка аутентификации для ${request.method} ${request.url}`);

    if (!token) {
      this.logger.warn(`Попытка доступа без токена: ${request.method} ${request.url}`);
      throw new UnauthorizedException('Access token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        {
          secret: secretKey
        }
      );
      
      // Проверяем, что payload содержит необходимые поля
      if (!payload.sub || !payload.email) {
        this.logger.warn('Токен содержит неполные данные');
        throw new UnauthorizedException('Invalid token structure');
      }
      
      // Добавляем пользователя в request для использования в контроллерах
      request['user'] = payload;
      
      this.logger.debug(`Успешная аутентификация для пользователя: ${payload.email} (ID: ${payload.sub})`);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        this.logger.warn('Попытка использования истекшего токена');
        throw new UnauthorizedException('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        this.logger.warn('Попытка использования невалидного токена');
        throw new UnauthorizedException('Invalid token');
      } else {
        this.logger.warn(`Неудачная попытка аутентификации: ${error.message}`);
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}