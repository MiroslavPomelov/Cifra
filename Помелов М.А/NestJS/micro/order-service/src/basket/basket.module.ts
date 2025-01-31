import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { BasketSchema } from './schemas/basket.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Cat', schema: BasketSchema}
    ])
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
