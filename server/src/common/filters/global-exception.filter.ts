import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { BaseGlobalExceptionFilter } from './base-exception.filter';

// Catch all exceptions include internal server error
@Catch()
export class GlobalExceptionFilter extends BaseGlobalExceptionFilter {
  constructor(httpAdapterHost: HttpAdapterHost) {
    super(httpAdapterHost);
  }

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const title = 'Internal Server Error';

    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

    this.buildResponse(exception, ctx, title, httpStatus, isDevelopment);
  }
}

// const ctx = host.switchToHttp();

// const httpStatus =
//   exception instanceof HttpException
//     ? exception.getStatus()
//     : HttpStatus.INTERNAL_SERVER_ERROR;
// const title =
//   exception instanceof HttpException ? 'Error' : 'Internal Server Error';

// const isProduction = process.env.NODE_ENV === 'production';

// const responseBody = {
//   title: title,
//   statusCode: httpStatus,
//   timestamp: new Date().toISOString(),
//   path: httpAdapter.getRequestUrl(ctx.getRequest()),
//   message: exception.message,
//   ...(isProduction ? {} : { trace: exception.stack }),
// };

// httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
