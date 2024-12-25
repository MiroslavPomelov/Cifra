import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { StoresModule } from './stores/stores.module';
import { UsersModule } from './users/users.module';
import { ProductsController } from './products/products.controller';


@Module({
  imports: [ProductsModule, WarehousesModule, StoresModule, UsersModule],
  controllers: [ProductsController]
})
export class AppModule {}
