
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    try {
      const status = exception.getStatus();
      const message = exception.message;
      response.status(status).json({
        code: status,
        message,
      });

    } catch (error) {
      response.status(500).json({
        code: 500,
        message: JSON.stringify(error),
      });

    }

  }
}