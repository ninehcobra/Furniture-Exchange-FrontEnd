import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  constructor() {
    super();
  }

  loggingEnvironmentVariables(moduleName: string) {
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
      this.warn(`File not found: ${envFilePath}`);
    } else {
      const envFile = fs.readFileSync(envFilePath, 'utf8');

      const env = dotenv.parse(envFile);

      for (const key in env) {
        this.debug(`${key} = ${env[key]}`);
      }
    }
  }
}
