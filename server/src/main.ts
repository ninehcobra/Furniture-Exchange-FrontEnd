import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigServiceExt } from './config/config.service';
import { LoggerService } from './logger/logger.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });

  const logger = new Logger('Application');

  // Set global prefix
  // app.setGlobalPrefix('api/v1');

  // Get ConfigService
  const configService = app.get(ConfigServiceExt);

  const PORT = configService.get('PORT', { infer: true });

  await app.listen(`${PORT || '3000'}`);

  logger.debug(`Server is running on port ${PORT}`);
}

bootstrap();
