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
  
  // Отключаем парсинг для multipart, но разрешаем json/urlencoded
  app.use('/auth/*', dynamicBodyParser);
  app.use('/users/*', dynamicBodyParser);
  app.use('/shops/*', dynamicBodyParser);
  app.use('/payment/*', dynamicBodyParser);
  app.use('/order/*', dynamicBodyParser);
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
  
  // Вкл CORS на всякий
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
