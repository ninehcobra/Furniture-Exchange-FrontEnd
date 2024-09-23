export interface EnvVariables {
  PORT: number;

  // environment
  NODE_ENV: string;

  // client url
  CLIENT_URL: string;

  // Rate limiting
  THROTTLE_TTL: number;
  THROTTLE_LIMIT: number;

  // Postgres
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;

  // JWT
  JWT_SECRET: string;
  JWT_AT_EXPIRES_IN: string;
  JWT_RT_EXPIRES_IN: string;
  SALT_OR_ROUNDS: number;

  // Mail
  MAIL_HOST: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  MAIL_FROM: string;
  MAIL_TRANSPORT: string;

  // Redis caching
  REDIS_HOST: string;
  REDIS_PORT: number;

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_FOLDER: string;
}
