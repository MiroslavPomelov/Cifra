import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [TasksModule, UsersModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), cookieParser(), LoggerMiddleware)
      .forRoutes('/users'); // Регистрация на маршрут мидлвер
  }
}
