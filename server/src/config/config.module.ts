import { DynamicModule, Global, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigServiceExt } from './config.service';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { validate } from 'class-validator';

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

    const envFilePath = path.resolve(__dirname, '../../', envFile);

    if (!fs.existsSync(envFilePath)) {
      console.log('File not found');
    } else {
      const envFile = fs.readFileSync(envFilePath, 'utf8');
      const env = dotenv.parse(envFile);
      for (const key in env) {
        console.log(`${key} = ${env[key]}`);
      }
    }

    console.log(envFilePath);

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
