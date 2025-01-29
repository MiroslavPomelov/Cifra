import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //для получения переменных среды
    TypeOrmModule.forRoot(
      {
        type: 'mariadb',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_POST),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true
      }
    ), ProductsModule,
  ],

})
export class AppModule {}
