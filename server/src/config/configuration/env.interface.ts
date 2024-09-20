export interface EnvVariables {
  NODE_ENV: string;
  PORT: number;
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
  JWT_AT_EXPIRATION: string;
  JWT_RT_EXPIRATION: string;
  SALT_OR_ROUNDS: number;

  // Twilio
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_VERIFICATION_SERVICE_SID: string;

  // Mail
  MAIL_HOST: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  MAIL_TOKEN_SECRET: string;
  MAIL_TOKEN_EXPIRATION: string;

  // Redis caching
  REDIS_HOST: string;
  REDIS_PORT: number;
}
