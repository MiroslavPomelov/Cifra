// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'usersdb', // имя сервиса из docker-compose
      port: 5432,
      username: 'users_user',
      password: 'users_password',
      database: 'usersdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // только для разработки!
    }),
    UserModule,
  ],
})
export class AppModule {}