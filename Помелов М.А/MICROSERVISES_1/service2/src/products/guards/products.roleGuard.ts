import {
  CanActivate,
  ExecutionContext,  
  HttpException,  
  HttpStatus,  
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CheckUserDto } from '../dto/checkUser.dto';
import { AxiosResponse } from 'axios';
import { getCallerInfo, logger } from 'src/logging/logger';

@Injectable()
export class ProductsRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler()); 

    if (!roles) return true;

    const request: any = context.switchToHttp().getRequest(); 
    const userId: Request = request.params.id; 
    console.log(`айди:${userId}`);

    if (!userId) throw new UnauthorizedException('Не передан id пользователя!');

    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(`http://users-service:3000/users/role/${userId}`),
      );

      const userRole: CheckUserDto = response.data;

      if (userRole == undefined || userRole == null) {
        logger.info(`Не определена роль пользователя по ${userId}!`);
        throw new UnauthorizedException('Роль пользователя не была найдена!'); 
      }      
      console.log(userRole.toString());
      return roles.includes(CheckUserDto[userRole]);
    } catch (error) {
      logger.error(getCallerInfo(error),'Ошибка запроса роли пользователя');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
