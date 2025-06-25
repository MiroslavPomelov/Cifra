// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServiceAuthGuard } from './user/guards/user-auth.guard';


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
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ServiceAuthGuard,
    }
  ]
})
export class AppModule { }




console.log(`HOST: ${process.env.DATABASE_HOST}`);
console.log(`TOKEN: ${process.env.ENV_TOKEN}`);