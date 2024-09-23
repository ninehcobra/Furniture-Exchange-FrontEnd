import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseGlobalExceptionFilter } from './base-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';

// Catch all HttpException
@Catch(HttpException)
export class GlobalHttpExceptionFilter extends BaseGlobalExceptionFilter {
  constructor(httpAdapterHost: HttpAdapterHost) {
    super(httpAdapterHost);
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const title = exception instanceof HttpException ? exception.name : 'Error';

    const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

    this.buildResponse(exception, ctx, title, httpStatus, isDevelopment);
  }
}
