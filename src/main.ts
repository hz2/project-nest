import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { HttpExecptionFilter } from './filter/http-execption.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 追加
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExecptionFilter())
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://0xc8.com',
    credentials: true
});
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
