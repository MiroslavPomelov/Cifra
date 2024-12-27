import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before');

    const now: number = Date.now();

    return next
      .handle()
      .pipe(
        map(data => {
          console.log(`After... ${Date.now() - now}ms`);
          return data;
        })
      );
  }
  
}
