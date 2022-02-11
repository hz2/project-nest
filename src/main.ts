import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 追加
  // app.enableCors(); // set cors in nginx proxy
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
