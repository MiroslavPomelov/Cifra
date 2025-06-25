// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServiceAuthGuard } from './user/guards/user-auth.guard';
import { AppController } from './app.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './deploy/environments/dev.env',
    }), // Для получения переменных среды
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'usersdb',
      // port: 5432,
      // username: 'users_user',
      // password: 'users_password',
      // database: 'usersdb',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true, 
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true, // Включаем логирование SQL запросов
      retryAttempts: 10, // Увеличиваем количество попыток подключения
      retryDelay: 3000, // Задержка между попытками в миллисекундах
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ServiceAuthGuard,
    }
  ]
})
export class AppModule { }



console.log(`HOST: ${process.env.DB_HOST}`);
console.log(`PORT: ${process.env.DB_PORT}`);
console.log(`USERNAME: ${process.env.DB_USERNAME}`);
console.log(`DATABASE: ${process.env.DB_NAME}`);
console.log(`TOKEN: ${process.env.ENV_TOKEN}`);