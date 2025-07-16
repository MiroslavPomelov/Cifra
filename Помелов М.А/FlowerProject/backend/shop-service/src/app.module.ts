import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ShopModule } from './shop/shop.module';
import { AppController } from './app.controller';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './deploy/environments/dev.env',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
        ttl: 60,
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    ShopModule,
  ],
  controllers: [AppController],
})
export class AppModule {} 