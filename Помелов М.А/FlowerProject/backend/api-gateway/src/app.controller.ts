import { Controller, Get, UseGuards, All, Req, Res, Logger } from '@nestjs/common';
import { AuthGuard } from './auth/guards/auth.guard';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import axios from 'axios';
import { ServiceConfigService } from './services/service-config.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly serviceConfigService: ServiceConfigService,
  ) { }

  @Get()
  getHello(): string {
    return 'API Gateway is running!';
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string; services: any } {
    const services = this.serviceConfigService.getAllServices();
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: Object.keys(services).map(key => ({
        name: key,
        config: services[key],
      })),
    };
  }

  @All(['users', 'users/', 'users/*'])
  @UseGuards(AuthGuard)
  async proxyUsers(@Req() req: Request, @Res() res: Response) {
    const targetUrl = this.serviceConfigService.getInternalUrl('users');
    if (!targetUrl) {
      return res.status(503).json({ message: 'Users service not available' });
    }
    await this.proxyRequest(req, res, targetUrl, 'users');
  }

  @All(['auth', 'auth/', 'auth/*'])
  async proxyAuth(@Req() req: Request, @Res() res: Response) {
    const targetUrl = this.serviceConfigService.getInternalUrl('auth');
    if (!targetUrl) {
      return res.status(503).json({ message: 'Auth service not available' });
    }
    await this.proxyRequest(req, res, targetUrl, 'auth');
  }

  @All(['shops', 'shops/', 'shops/*'])
  // Убрал @UseGuards(AuthGuard) для публичного доступа
  async proxyShops(@Req() req: Request, @Res() res: Response) {
    const targetUrl = this.serviceConfigService.getInternalUrl('shops');
    if (!targetUrl) {
      return res.status(503).json({ message: 'Shop service not available' });
    }
    this.logger.debug(`API-GATEWAY: proxyShops called for ${req.method} ${req.url}`);
    await this.proxyRequest(req, res, targetUrl, 'shops');
  }

  @All(['products', 'products/', 'products/*'])
  // Убрал @UseGuards(AuthGuard) для публичного доступа
  async proxyProducts(@Req() req: Request, @Res() res: Response) {
    const targetUrl = this.serviceConfigService.getInternalUrl('products');
    if (!targetUrl) {
      return res.status(503).json({ message: 'Product service not available' });
    }
    await this.proxyRequest(req, res, targetUrl, 'products');
  }

  @All(['payment', 'payment/', 'payment/*'])
  async proxyPayment(@Req() req: Request, @Res() res: Response) {
    const targetUrl = this.serviceConfigService.getInternalUrl('payment');
    if (!targetUrl) {
      return res.status(503).json({ message: 'Payment service not available' });
    }
    await this.proxyRequest(req, res, targetUrl, 'payment');
  }

  @All(['order', 'order/', 'order/*'])
  @UseGuards(AuthGuard)
  async proxyOrder(@Req() req: Request, @Res() res: Response) {
    const targetUrl = this.serviceConfigService.getInternalUrl('order');
    if (!targetUrl) {
      return res.status(503).json({ message: 'Order service not available' });
    }
    await this.proxyRequest(req, res, targetUrl, 'order');
  }

  private async proxyRequest(
    req: Request,
    res: Response,
    targetUrl: string,
    serviceName: string
  ) {
    const url = `${targetUrl}${req.url}`;
    const method = req.method.toLowerCase();
    const contentType = (req.headers['content-type'] || '').toString();
    const isMultipart = contentType.includes('multipart/form-data');
    const data = (method !== 'get') ? (isMultipart ? (req as any) : req.body) : undefined;
    
    const headers = {
      ...req.headers,
      'envservicetoken': process.env.ENV_TOKEN || 'ya29.asdgv_sadashldkjhasdiufrekjhkjhdaksjhduHOIUhiluGHiglUUU',
      'X-Gateway-Service': serviceName,
      'X-Gateway-Timestamp': new Date().toISOString(),
    } as any;
    
    delete headers['content-length'];
    delete headers['Content-Length'];
    
    this.logger.debug(`API-GATEWAY: ${serviceName} - ${method.toUpperCase()} ${url}`);
    this.logger.debug(`API-GATEWAY: Authorization header: ${headers['authorization']}`);
    this.logger.debug(`API-GATEWAY: All headers: ${JSON.stringify(headers, null, 2)}`);
    
    try {
      const response = await axios({
        method,
        url,
        data,
        headers,
        timeout: 30000,
        validateStatus: () => true, 
        maxContentLength: Infinity,
        maxBodyLength: Infinity, 
        ...(isMultipart ? { responseType: 'json', transformRequest: [(d) => d], decompress: false } : {}),
      });
      
      this.logger.debug(`API-GATEWAY: ${serviceName} - Success (${response.status})`);
      res.status(response.status).json(response.data);
    } catch (error) {
      this.logger.error(`API-GATEWAY: ${serviceName} - Error: ${error.message}`);
      
      if (error.response) {
        const backendData = error.response.data;
        if (backendData && (backendData.message || backendData.error)) {
          res.status(error.response.status).json(backendData);
        } else {
          res.status(error.response.status).json({
            message: `${serviceName} service error`,
            status: error.response.status,
            timestamp: new Date().toISOString(),
          });
        }
      } else if (error.request) {
        res.status(503).json({
          message: `${serviceName} service unavailable`,
          error: 'No response from service',
          timestamp: new Date().toISOString(),
        });
      } else {
        res.status(500).json({
          message: 'Internal gateway error',
          error: error.message,
          service: serviceName,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }
}
