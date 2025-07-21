import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

function dynamicBodyParser(req, res, next) {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('application/json')) {
    return bodyParser.json()(req, res, next);
  }
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return bodyParser.urlencoded({ extended: true })(req, res, next);
  }
  if (contentType.includes('text/')) {
    return bodyParser.text()(req, res, next);
  }
  if (contentType.includes('multipart/form-data')) {
    return next();
  }
  return bodyParser.raw({ type: '*/*' })(req, res, next);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Отключил парсинг body для прокси маршрутов
  app.use('/auth/*', bodyParser.raw({ type: '*/*' }));
  app.use('/users/*', bodyParser.raw({ type: '*/*' }));
  app.use('/shops/*', bodyParser.raw({ type: '*/*' }));
  app.use('/products/*', dynamicBodyParser);
  // Удалить потом
  app.use('/products/*', (req, res, next) => {
    console.log('--- [GATEWAY] /products/* ---');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Parsed body:', req.body);
    next();
  });
  
  // Вкл CORS навсякий
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
