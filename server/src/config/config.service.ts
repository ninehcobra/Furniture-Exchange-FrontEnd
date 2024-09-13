import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './interfaces/env.interface';

@Injectable()
export class ConfigServiceExt extends ConfigService<EnvVariables> {
  constructor() {
    super(); // No need to pass ConfigService into the constructor
  }
}
