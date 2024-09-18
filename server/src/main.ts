import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import swaggerConfig from './common/swagger.config';
import helmet from 'helmet';
import * as compression from 'compression';
import { GlobalExceptionsFilter } from './core/exceptions/global-exception.filter';
import { ConfigServiceExt } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  const logger = new Logger('Application');
  const configService = app.get(ConfigServiceExt);
  const PORT = configService.get('PORT', { infer: true });
  const CLIENT_URL = configService.get('CLIENT_URL', { infer: true });

  // Enable CORS
  app.enableCors({
    origin: CLIENT_URL,
  });

  // Global Exception filter
  app.useGlobalFilters(new GlobalExceptionsFilter(app.get(HttpAdapterHost)));
  // app.useGlobalFilters(new HttpExceptionFilter());

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
  logger.debug(`Server is running on port ${PORT}`);
}

bootstrap();
