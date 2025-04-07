import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 6000 * 60,
      max: 100
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
