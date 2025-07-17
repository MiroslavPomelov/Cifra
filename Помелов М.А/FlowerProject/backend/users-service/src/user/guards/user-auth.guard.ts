import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ServiceAuthGuard implements CanActivate {
    private readonly logger = new Logger(ServiceAuthGuard.name);
    private readonly publicEndpoints = ['/health', '/api', '/api-json'];
    
    constructor(private readonly configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        // Пропускаем публичные endpoints
        if (this.isPublicEndpoint(request.url)) {
            return true;
        }
        // Если есть пользовательский JWT — пропускаем (пусть работают JwtAuthGuard и UserSelfGuard)
        const authHeader = request.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            this.logger.debug('User JWT detected, skipping ServiceAuthGuard');
            return true;
        }
        // Проверяем межсервисный токен
        const token = request.headers['envservicetoken'];
        const validToken = this.configService.get('ENV_TOKEN');
        this.logger.debug(`Request URL: ${request.url}, Token: ${token}`);
        if (token !== validToken) {
            this.logger.warn('Не валидный(межсервисный) токен');
            throw new UnauthorizedException('Не валидный токен');
        }
        return true;
    }

    private isPublicEndpoint(url: string): boolean {
        return this.publicEndpoints.some(endpoint => url.startsWith(endpoint));
    }
}