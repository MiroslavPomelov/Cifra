import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService,
    private readonly cacheManager: Cache) { }

  public async apiRequest(url: string, body: string, method: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.request({ url: url, method: method, data: body }))
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async apiRequestWithCache(url: string, body: string, method: string): Promise<any> {
    try {
      const parts = url.split('/');
      const key = parts[4];
      if (key == 'new' ) {

        if (this.cacheManager.get('all')){          
          this.cacheManager.del('all');
        }
        
        const response = await firstValueFrom(this.httpService.request({ url: url, method: method, data: body }));
        await this.cacheManager.set(response.data.id, response.data);
        return response.data;
      }
     

      if (key == 'update') {

        if (this.cacheManager.get('all')){
          this.cacheManager.del('all');
        }
        
        const response = await firstValueFrom(this.httpService.request({ url: url, method: method, data: body }));
        await this.cacheManager.set(parts[5], response.data);
        return response.data;
      }

      if (key == 'role' && parts[5]) {
        const cachedData = await this.cacheManager.get(key + parts[5]);
        if (cachedData) {
          // Можете проверить наличие данных в кэше 
          console.log(`Получение данных из кэша:  ${cachedData}`);
          return cachedData;
        }
        else {
          const response = await firstValueFrom(this.httpService.request({ url: url, method: method, data: body }));
          await this.cacheManager.set(key + parts[5], response.data);
          return response.data;
        }
      }

     
      console.log(key);
      const cachedData = await this.cacheManager.get(key);

      if (cachedData) {
        // Можете проверить наличие данных в кэше 
        console.log(`Получение данных из кэша:  ${cachedData}`);
        return cachedData;
      }
      const response = await firstValueFrom(this.httpService.request({ url: url, method: method, data: body }));
      await this.cacheManager.set(key, response.data);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
}



