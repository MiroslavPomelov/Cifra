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

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    this.logger.debug(`Проверка аутентификации для ${request.method} ${request.url}`);

    if (!token) {
      this.logger.warn(`Попытка доступа без токена: ${request.method} ${request.url}`);
      throw new UnauthorizedException('Access token is required');
    }

    const payload = await this.validateToken(token);
    request['user'] = payload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async validateToken(token: string): Promise<any> {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });
      this.logger.debug(`Токен валиден для пользователя: ${payload.email}`);
      return payload;
    } catch (error) {
      this.logger.warn(`Ошибка валидации токена: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}