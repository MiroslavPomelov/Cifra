import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('database env1: ' + process.env.DATABASE_USER);
  console.log('database env2: ' + process.env.DATABASE_PASSWORD);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
