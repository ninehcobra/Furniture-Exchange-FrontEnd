import { ConsoleLogger } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

export class MyLogger extends ConsoleLogger {
  constructor() {
    super();

    this.EnvLoggers();
  }

  log(message: string) {
    super.log(message);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
  }

  warn(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  verbose(message: string) {
    super.verbose(message);
  }

  private EnvLoggers() {
    process.env.NODE_ENV === 'production'
      ? this.warn('Production mode')
      : this.warn('Development mode');

    const envFilePath = path.resolve(`.env.${process.env.NODE_ENV}`);

    if (!fs.existsSync(envFilePath)) {
      this.warn(`File not found: ${envFilePath}`);
    }

    if (process.env.NODE_ENV === 'development') {
      const envFile = fs.readFileSync(envFilePath, 'utf8');

      const env = dotenv.parse(envFile);

      for (const key in env) {
        this.debug(`${key} = ${env[key]}`);
      }
    }
  }
}
