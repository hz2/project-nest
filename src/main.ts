import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExecptionFilter } from './filter/http-execption.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 追加
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExecptionFilter())
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
