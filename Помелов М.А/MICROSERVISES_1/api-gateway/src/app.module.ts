import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager'; 

@Module({
  imports: [HttpModule, 
    CacheModule.register({ 
    ttl:  6000*60  ,  // Время жизни в милисекундах 
    max:  100  ,  // Максимальное количество элементов в кэше 
    }), ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
