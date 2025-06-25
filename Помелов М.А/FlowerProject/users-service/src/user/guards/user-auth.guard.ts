import { Injectable, CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";


@Injectable()
export class ServiceAuthGuard implements CanActivate {
    private readonly logger = new Logger(ServiceAuthGuard.name);
    constructor(private configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['envServiceToken'];

        const validToken = this.configService.get('ENV_TOKEN');

        if (token != validToken) {
            this.logger.warn('Не валидный токен');
            throw new Error('Не удалось обратиться к сервису!');
        }

        return token === validToken;
    }
}