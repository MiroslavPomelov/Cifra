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

  private async proxyRequest(
    req: Request,
    res: Response,
    targetUrl: string
  ) {
    const url = `${targetUrl}${req.url}`;
    const method = req.method.toLowerCase();
    const data = req.body && Buffer.isBuffer(req.body) ? req.body : undefined;
    const headers = {
      ...req.headers,
      'Content-Type': 'application/json',
      'envservicetoken': process.env.ENV_TOKEN || 'your-service-token',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          url,
          method,
          data,
          headers,
        })
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      const backendData = error.response?.data;
      if (backendData && (backendData.message || backendData.error)) {
        res.status(error.response?.status || 500).json(backendData);
      } else {
        res.status(error.response?.status || 500).json({
          message: 'Proxy error',
          error: error.message,
          data: backendData,
        });
      }
    }
  }
}
