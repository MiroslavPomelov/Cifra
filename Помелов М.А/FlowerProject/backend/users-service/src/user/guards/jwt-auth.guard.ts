import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('[JwtAuthGuard] canActivate called');
    return super.canActivate(context);
  }
  handleRequest(err, user, info, context) {
    if (err || !user) {
      console.error('[JwtAuthGuard] handleRequest error:', err, info);
      throw err || new UnauthorizedException('JWT validation failed');
    }
    console.log('[JwtAuthGuard] handleRequest user:', user);
    return user;
  }
} 