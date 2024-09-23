import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpAdapterHost } from '@nestjs/core';

export class BaseGlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {}

  protected buildResponse(
    exception: any,
    ctx: HttpArgumentsHost,
    title: string = 'Error',
    httpStatus: number = 500,
    isDevelopment: boolean = true,
  ) {
    const { httpAdapter } = this.httpAdapterHost;

    const responseBody = {
      title: title,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message,
      ...(isDevelopment ? { trace: exception.stack } : {}),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
