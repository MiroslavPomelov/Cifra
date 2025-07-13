import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ServiceAuthGuard } from './guards/service-auth.guard';
import { JwtShopGuard } from './guards/jwt-shop.guard';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Product]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ENV_KEY') || 'product_jwt_secret',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [ProductController],
  providers: [ProductService, ServiceAuthGuard, JwtShopGuard],
  exports: [ProductService],
})
export class ProductModule {} 