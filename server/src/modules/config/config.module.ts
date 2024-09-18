import { DynamicModule, Global, Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigServiceExt } from './config.service';
import { validate } from 'class-validator';
import { LoggerService } from 'src/modules/logger/logger.service';

@Global() // Ensures this module is global
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validate,
    }),
  ],
  providers: [
    {
      provide: ConfigServiceExt,
      useClass: ConfigServiceExt,
    },
  ],
  exports: [ConfigServiceExt],
})
export class ConfigExtModule {
  constructor(private loggerService: LoggerService) {
    loggerService.loggingEnvironmentVariables(ConfigExtModule.name);
  }

  static forRoot(): DynamicModule {
    let envFile = '.env.development';

    switch (process.env.NODE_ENV) {
      case 'production':
        envFile = '.env.production';
        break;
      case 'test':
        envFile = '.env.test';
        break;
      default:
        envFile = '.env.development';
        break;
    }

    return {
      imports: [
        ConfigModule.forRoot({
          envFilePath: envFile,
        }),
      ],

      module: ConfigExtModule,
    };
  }
}
