import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigServiceExt } from './config/config.service';
import { LoggerService } from './logger/logger.service';
import { Logger } from '@nestjs/common';
import swaggerConfig from './common/sawgger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  const logger = new Logger('Application');
  const configService = app.get(ConfigServiceExt);
  const PORT = configService.get('PORT', { infer: true });

  // Set global prefix
  app.setGlobalPrefix('api/v1');

  // Swagger config
  swaggerConfig(app);

  await app.listen(`${PORT || '3000'}`);
  logger.debug(`Server is running on port ${PORT}`);
}

bootstrap();
