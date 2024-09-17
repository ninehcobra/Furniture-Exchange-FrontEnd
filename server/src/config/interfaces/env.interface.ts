export interface EnvVariables {
  NODE_ENV: string;
  PORT: number;
  CLIENT_URL: string;
  THROTTLE_TTL: number;
  THROTTLE_LIMIT: number;

  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
}
