import { ConfigModuleOptions } from '@nestjs/config';
import validate from './env.validation';

export const configurationOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
  validate: validate,
};
