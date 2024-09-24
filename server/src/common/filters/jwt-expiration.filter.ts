import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseGlobalExceptionFilter } from './base-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { TokenExpiredError } from 'jsonwebtoken';

// Catch all HttpException
@Catch(TokenExpiredError)
export class JwtExpirationExceptionFilter extends BaseGlobalExceptionFilter {
  constructor(httpAdapterHost: HttpAdapterHost) {
    super(httpAdapterHost);
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.UNAUTHORIZED;

    const title = 'Token Expired';

    const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

    this.buildResponse(exception, ctx, title, httpStatus, isDevelopment);
  }
}
