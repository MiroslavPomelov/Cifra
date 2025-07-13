import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtShopGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Нет JWT');
    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = this.jwtService.verify(token, { secret: this.configService.get('ENV_KEY') });
      if (payload.role !== 'shop' || !payload.sub) throw new UnauthorizedException('Недостаточно прав');
      request.shopId = payload.sub;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Невалидный JWT');
    }
  }
} 