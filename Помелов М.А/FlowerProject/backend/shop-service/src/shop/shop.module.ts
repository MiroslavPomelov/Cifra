import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { Shop } from './entities/shop.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceAuthGuard } from './guards/service-auth.guard';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Shop]), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [ShopController],
  providers: [ShopService, ServiceAuthGuard],
  exports: [ShopService],
})
export class ShopModule {} 