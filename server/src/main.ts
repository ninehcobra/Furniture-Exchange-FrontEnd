import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import swaggerConfig from './config/swagger';
import { MyLogger } from './config/logger';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './environments/env.interface';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtExpirationExceptionFilter } from './common/filters/jwt-expiration.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    logger: new MyLogger(),
  });

  const config = app.get(ConfigService<EnvVariables>);

  const PORT = config.get('PORT');
  const CLIENT_URL = config.get('CLIENT_URL');

  // Enable CORS
  app.enableCors({
    origin: CLIENT_URL,
  });

  // Global Exception filter
  app.useGlobalFilters(new GlobalHttpExceptionFilter(app.get(HttpAdapterHost))); // Catch all HttpException
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(HttpAdapterHost))); // Catch all exceptions include internal server error
  app.useGlobalFilters(
    new JwtExpirationExceptionFilter(app.get(HttpAdapterHost)),
  ); // Catch TokenExpiredError

  // Global interceptor (sample)
  // app.useGlobalInterceptors(new TimeExecutionInterceptor());

  // Set security headers
  // prevent common security vulnerabilities by setting HTTP headers appropriately
  app.use(helmet());

  // Compression reduce the size of the response body and increase the speed of a web app
  app.use(compression());

  // Set global prefix
  app.setGlobalPrefix('api/v1');

  // Swagger config
  swaggerConfig(app);

  await app.listen(`${PORT || '3000'}`);
  Logger.debug(`Server is running on port ${PORT}`);
}

bootstrap();
