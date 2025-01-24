import { Cache } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly cacheManager: Cache
  ) { }

  public async getData(key: string): Promise<any> {
    const cachedData = await this.cacheManager.get(key);

    if (cachedData) {
      console.log(cachedData);
      return cachedData;
    }


    // В противном случае - запросить данные из хранилища
    const notCachingData = 'asdasd';

    if (notCachingData) {
      this.cacheManager.set(key, notCachingData);
      return notCachingData;
    }

    return null;
  }
}
