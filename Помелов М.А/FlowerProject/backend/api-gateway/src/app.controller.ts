import { Controller, Get, UseGuards, All, Req, Res } from '@nestjs/common';
import { AuthGuard } from './auth/guards/auth.guard';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) { }

  @Get()
  getHello(): string {
    return 'API Gateway is running!';
  }

  @All(['users', 'users/', 'users/*'])
  @UseGuards(AuthGuard)
  async proxyUsers(@Req() req: Request, @Res() res: Response) {
    await this.proxyRequest(req, res, 'http://users-service:3000');
  }

  @All(['auth', 'auth/', 'auth/*'])
  async proxyAuth(@Req() req: Request, @Res() res: Response) {
    await this.proxyRequest(req, res, 'http://auth-service:3000');
  }

  @All(['shops', 'shops/', 'shops/*'])
  @UseGuards(AuthGuard) // защищённые операции с магазинами требуют токен
  async proxyShops(@Req() req: Request, @Res() res: Response) {
    console.log('API-GATEWAY: proxyShops called');
    console.log('API-GATEWAY: Incoming headers:', req.headers);
    try {
      await this.proxyRequest(req, res, 'http://shop-service:3000');
      console.log('API-GATEWAY: proxyShops success');
    } catch (error) {
      console.error('API-GATEWAY: proxyShops error:', error);
      throw error;
    }
  }

  @All(['products', 'products/', 'products/*'])
  @UseGuards(AuthGuard)
  async proxyProducts(@Req() req: Request, @Res() res: Response) {
    await this.proxyRequest(req, res, 'http://product-service:3000');
  }

  @All(['payment', 'payment/', 'payment/*'])
  async proxyPayment(@Req() req: Request, @Res() res: Response) {
    await this.proxyRequest(req, res, 'http://payment-service:3000');
  }

  @All(['order', 'order/', 'order/*'])
  @UseGuards(AuthGuard)
  async proxyOrder(@Req() req: Request, @Res() res: Response) {
    await this.proxyRequest(req, res, 'http://order-service:3000');
  }

  private async proxyRequest(
    req: Request,
    res: Response,
    targetUrl: string
  ) {
    const url = `${targetUrl}${req.url}`;
    const method = req.method.toLowerCase();
    // Для Get не нада
    const data = (method !== 'get' && req.body) ? req.body : undefined;
    const headers = {
      ...req.headers,
      'Content-Type': 'application/json',
      'envservicetoken': process.env.ENV_TOKEN || 'ya29.asdgv_sadashldkjhasdiufrekjhkjhdaksjhduHOIUhiluGHiglUUU',
    };
    // Удаляю content-length
    delete headers['content-length'];
    delete headers['Content-Length'];
    console.log('API-GATEWAY: proxyRequest to', url, 'with headers:', headers);
    try {
      const response = await firstValueFrom(
        this.httpService.request({
          url,
          method,
          ...(data !== undefined ? { data } : {}),
          headers,
        })
      );
      console.log('API-GATEWAY: proxyRequest success, status:', response.status);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('API-GATEWAY: proxyRequest error:', error);
      const backendData = error.response?.data;
      if (backendData && (backendData.message || backendData.error)) {
        res.status(error.response?.status || 500).json(backendData);
      } else {
        res.status(error.response?.status || 500).json({
          message: 'Proxy error',
        });
      }
    }
  }
}
