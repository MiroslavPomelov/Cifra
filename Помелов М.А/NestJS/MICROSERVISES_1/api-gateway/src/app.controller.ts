import { All, Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('users')
  public async toUsers(@Req() request: Request): Promise<any> {
    return this.appService.toUsers(request.url, request.body, request.method);
  }

  @All('products')
  public async toProducts(@Req() request: Request): Promise<any> {
    return this.appService.toProducts(request.url, request.body, request.method);
  }

  @All('orders')
  public async toOrders(@Req() request: Request): Promise<any> {
    return this.appService.toOrders(request.url, request.body, request.method);
  }

  @All('chat')
  public async toChat(@Req() request: Request): Promise<any> {
    return this.appService.toChat(request.url, request.body, request.method);
  }

  @All('reports')
  public async toReport(@Req() request: Request): Promise<any> {
    return this.appService.toReports(request.url, request.body, request.method);
  }

}
