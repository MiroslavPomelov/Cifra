import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  public async apiRequestToUsers(url: string, method: string, body: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get(url, { method: method, data: body }));
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async apiRequestToProducts(url: string, method: string, body: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get(url, { method: method, data: body }));
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async apiRequestToOrders(url: string, method: string, body: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get(url, { method: method, data: body }));
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async apiRequestToChat(url: string, method: string, body: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get(url, { method: method, data: body }));
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async apiRequestToReports(url: string, method: string, body: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get(url, { method: method, data: body }));
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
