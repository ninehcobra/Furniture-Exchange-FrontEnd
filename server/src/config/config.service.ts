import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './interfaces/env.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigServiceExt extends ConfigService<EnvVariables> {
  constructor() {
    super();
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.get('POSTGRES_HOST'),
      port: parseInt(this.get('POSTGRES_PORT')),
      username: this.get('POSTGRES_USER'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],
    };
  }
}
