import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class TimeExecutionInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const method = req.method;
        const url = req.url;
        const statusCode = res.statusCode;
        const time = Date.now() - now;

        this.logger.log(
          `${method} ${url} ${statusCode} - ${time}ms`,
          context.getClass().name,
        );

        return data;
      }),
    );
  }
}
