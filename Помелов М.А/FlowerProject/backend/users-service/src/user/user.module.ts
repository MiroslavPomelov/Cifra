// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FavouriteProduct } from './entities/favourite-product.entity';
import { UserService } from './user.service';
import { FavouriteProductService } from './favourite-product.service';
import { UserController } from './user.controller';
import { FavouriteProductController } from './favourite-product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, FavouriteProduct])], // ← Это регистрирует репозитории
  controllers: [UserController, FavouriteProductController],
  providers: [UserService, FavouriteProductService],
  exports: [TypeOrmModule, UserService, FavouriteProductService], // ← Важно экспортировать TypeOrmModule
})
export class UserModule {}