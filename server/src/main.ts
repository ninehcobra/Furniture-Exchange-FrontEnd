import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigServiceExt } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });

  // Set global prefix
  // app.setGlobalPrefix('api/v1');

  // Get ConfigService
  const configService = app.get(ConfigServiceExt);

  const PORT = configService.get('PORT', { infer: true });

  await app.listen(`${PORT || '3000'}`);

  console.log(`Server is running on port ${PORT}`);
}

bootstrap();
