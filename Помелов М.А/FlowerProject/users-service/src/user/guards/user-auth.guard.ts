import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";

@Injectable()
export class ServiceAuthGuard implements CanActivate {
    private readonly logger = new Logger(ServiceAuthGuard.name);
    constructor(private configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        // Исключаем публичные endpoints
        const publicEndpoints = ['/health', '/api', '/api-json'];
        if (publicEndpoints.some(endpoint => request.url.startsWith(endpoint))) {
            return true;
        }
        
        const token = request.headers['envservicetoken'];
        const validToken = this.configService.get('ENV_TOKEN');

        // Логирование для отладки
        this.logger.debug(`Request URL: ${request.url}`);
        this.logger.debug(`Received token: ${token}`);
        this.logger.debug(`Valid token: ${validToken}`);

        if (token != validToken) {
            this.logger.warn('Не валидный токен');
            throw new UnauthorizedException('Не валидный токен');
        }

        return true;
    }
}