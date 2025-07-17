import { CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';

export class UserSelfGuard implements CanActivate {
  private readonly logger = new Logger(UserSelfGuard.name);
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    this.logger.log(`request.user: ${JSON.stringify(request.user)}`);
    this.logger.log(`request.params.id: ${request.params.id} (type: ${typeof request.params.id})`);
    if (!request.user) {
      this.logger.warn('JwtAuthGuard did not set request.user!');
      throw new ForbiddenException('Нет доступа: пользователь не аутентифицирован');
    }
    const userIdFromToken = request.user.sub;
    const userIdFromParam = Number(request.params.id);
    this.logger.log(`userIdFromToken: ${userIdFromToken} (type: ${typeof userIdFromToken}), userIdFromParam: ${userIdFromParam} (type: ${typeof userIdFromParam})`);
    if (userIdFromToken !== userIdFromParam) {
      this.logger.warn(`Access denied: userIdFromToken (${userIdFromToken}) !== userIdFromParam (${userIdFromParam})`);
      throw new ForbiddenException('Нет доступа к чужим данным');
    }
    return true;
  }
} 