// src/interception/transform.interception.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType();
    if (String(type) === 'graphql') {
      return next.handle()
    } else {
      return next.handle().pipe(
        map((data) => ({
          code: 200,
          data,
          message: 'success',
        })),
      );
    }
  }
}