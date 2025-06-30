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
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }

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
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(
          `http://auth-service:3000/users/validatetoken`,
          token,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      const payload = await response.data;
      if (payload) {
        request['user'] = payload;
      }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}