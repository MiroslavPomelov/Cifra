// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FavouriteProduct } from './entities/favourite-product.entity';
import { UserService } from './user.service';
import { FavouriteProductService } from './favourite-product.service';
import { UserController } from './user.controller';
import { FavouriteProductController } from './favourite-product.controller';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserSelfGuard } from './guards/user-self.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FavouriteProduct]),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST', 'localhost'),
        port: configService.get('REDIS_PORT', 6379),
        ttl: configService.get('REDIS_TTL', 60),
      }),
    }),
  ],
  controllers: [UserController, FavouriteProductController],
  providers: [UserService, FavouriteProductService, JwtStrategy, JwtAuthGuard, UserSelfGuard],
  exports: [TypeOrmModule, UserService, FavouriteProductService], // ← Важно экспортировать TypeOrmModule
})
export class UserModule {}