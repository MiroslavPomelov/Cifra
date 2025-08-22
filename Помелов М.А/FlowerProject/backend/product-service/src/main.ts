import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/products') && req.method === 'POST') {
      console.log('PARSED BODY:', req.body);
    }
    next();
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  console.log(`Product-service is running on port ${port}`);
}
bootstrap(); 