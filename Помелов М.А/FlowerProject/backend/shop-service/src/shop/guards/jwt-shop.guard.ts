import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtShopGuard implements CanActivate {
  private readonly logger = new Logger(JwtShopGuard.name);
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Нет JWT');
    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
      this.logger.debug('JWT payload:', payload);
      if (payload.role !== 'shop' || !payload.sub) throw new UnauthorizedException('Недостаточно прав');
      request.shopId = payload.sub;
      return true;
    } catch (e) {
      this.logger.warn('Невалидный JWT:', e.message);
      throw new UnauthorizedException('Невалидный JWT');
    }
  }
} 