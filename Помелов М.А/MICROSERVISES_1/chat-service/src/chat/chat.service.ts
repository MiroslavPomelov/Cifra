import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
    constructor(private readonly httpService: HttpService) {}

    public async findInProductsDb(message: string): Promise<AxiosResponse> {
        
        try {
                const response: AxiosResponse = await firstValueFrom(
                  this.httpService.get(`http://products-service:3000/products/search?searchWord=${message}`)
                );      
          
                if (response.status != 200) {
                       throw new UnauthorizedException(`Failed to check product with word: ${message}`);
                }

                return response;
        }
        catch (error) {          
          throw error;
        }
        
      }
}
