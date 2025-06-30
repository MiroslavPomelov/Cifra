import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Отключаем парсинг body для проксируемых маршрутов
  app.use('/auth/*', bodyParser.raw({ type: '*/*' }));
  app.use('/users/*', bodyParser.raw({ type: '*/*' }));
  
  // Включаем CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
