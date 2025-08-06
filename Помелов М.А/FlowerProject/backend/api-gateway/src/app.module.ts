import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { ServiceConfigService } from './services/service-config.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [ServiceConfigService],
})
export class AppModule {}
