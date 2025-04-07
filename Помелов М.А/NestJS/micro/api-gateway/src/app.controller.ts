import { All, Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @All('users')
  public async apiRequestToUsers(@Req() request: Request): Promise<any> {
   return this.appService.apiRequestToUsers(request.url, request.method, request.body);
  }

  @All('products')
  public async apiRequestToProducts(@Req() request: Request): Promise<any> {
    return this.appService.apiRequestToUsers(request.url, request.method, request.body);
   }

  @All('orders')
  public async apiRequestToOrders(@Req() request: Request): Promise<any> {
    return this.appService.apiRequestToUsers(request.url, request.method, request.body);
   }

  @All('reports')
  public async apiRequestToReports(@Req() request: Request): Promise<any> {
    return this.appService.apiRequestToUsers(request.url, request.method, request.body);
   }
}
