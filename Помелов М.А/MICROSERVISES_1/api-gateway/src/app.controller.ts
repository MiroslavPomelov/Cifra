import { All, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AuthGuard } from './auth/auth.guard';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService    
  ) {}

  
  @Post('/login')
  public async login(@Req()request: Request): Promise<any> {
    const urlPath = request.path;   
    return this.appService.apiRequest(`http://a-service:3000${urlPath}`, request.body, request.method);
  }
 
  @Post('/registration')
  public async registration(@Req()request: Request): Promise<any> {
    const urlPath = request.path;   
    return this.appService.apiRequest(`http://a-service:3000${urlPath}`, request.body, request.method);
  }

  @UseGuards(AuthGuard)
  @All('/users/*')
  public async toUsers(@Req()request: Request): Promise<any> {
    const urlPath = request.path;
    console.log(urlPath); 
    return this.appService.apiRequestWithCache(`http://users-service:3000${urlPath}`, request.body, request.method);
  } 
  
  @UseGuards(AuthGuard)
  @All('/products/*')
  public async toProducts(@Req()request: Request): Promise<any> {
    const urlPath = request.path;   
    return this.appService.apiRequest(`http://products-service:3000${urlPath}`, request.body, request.method);
  }

  @UseGuards(AuthGuard)
  @All('/orders/*')
  public async toOrders(@Req()request: Request): Promise<any> {
    const urlPath = request.path;   
    return this.appService.apiRequest(`http://orders-service:3000${urlPath}`, request.body, request.method);;
  }

  @UseGuards(AuthGuard)
  @All('/chat/*')
  public async toChat(@Req()request: Request): Promise<any> {
    const urlPath = request.path;   
    return this.appService.apiRequest(`http://chat-service:3000${urlPath}`, request.body, request.method);
  }

  @UseGuards(AuthGuard)
  @All('/reports/*')
  public async toReviews(@Req()request: Request): Promise<any> {
    const urlPath = request.path;   
    return this.appService.apiRequest(`http://reports-service:3000${urlPath}`, request.body, request.method);
  }
}

