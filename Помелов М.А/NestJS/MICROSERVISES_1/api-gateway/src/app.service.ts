import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService){}

  public async toUsers(url: string, body: string, method: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get(url,{method: method, data: body}))
      return response.data;
    }
    catch (error) {
      throw error;
    }
    
  }

  public async toProducts(url: string, body: string, method: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.get(url,{method: method, data: body}))
    return response.data;
  }

  public async toOrders(url: string, body: string, method: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.get(url,{method: method, data: body}))
    return response.data;
  }

  public async toChat(url: string, body: string, method: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.get(url,{method: method, data: body}))
    return response.data;
  }

  public async toReports(url: string, body: string, method: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.get(url,{method: method, data: body}))
    return response.data;
  }
}
