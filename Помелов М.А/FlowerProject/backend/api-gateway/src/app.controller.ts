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

  // @All('users')
  // @All('users/')
  @All('users/*')
  @UseGuards(AuthGuard)
  async proxyUsers(@Req() req: Request, @Res() res: Response) {
    // if (!req.headers['envservicetoken']) {
    //   return res.status(401).json({ message: 'envservicetoken header is required' });
    // }
    await this.proxyRequest(req, res, 'http://users-service:3000', true);
  }

  // @All('auth')
  // @All('auth/')
  @All('auth/*')
  async proxyAuth(@Req() req: Request, @Res() res: Response) {
    await this.proxyRequest(req, res, 'http://auth-service:3000', false);
  }

  private async proxyRequest(
    req: Request,
    res: Response,
    targetUrl: string,
    addServiceToken: boolean = false
  ) {
    const url = `${targetUrl}${req.url}`;
    const method = req.method.toLowerCase();
    const data = req.body && Buffer.isBuffer(req.body) ? req.body : undefined;
    const headers = { ...req.headers, 'Content-Type': 'application/json', 'envservicetoken': process.env.ENV_TOKEN };

    if (addServiceToken) {
      headers['envservicetoken'] = process.env.ENV_TOKEN || 'your-service-token';
    }

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
      res.status(error.response?.status || 500).json({
        message: 'Proxy error',
        error: error.message,
        data: error.response?.data,
      });
    }
  }

 
}
