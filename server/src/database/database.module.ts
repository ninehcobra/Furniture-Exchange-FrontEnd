import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigExtModule } from 'src/config/config.module';
import { ConfigServiceExt } from 'src/config/config.service';
import { DataSourceOptions } from 'typeorm';

export var dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'bale',
  password: 'bale',
  database: 'FurnitureExchange',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false, // Ensure this is set to false in production
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigExtModule],
      inject: [ConfigServiceExt],
      useFactory: (configService: ConfigServiceExt) => {
        const NODE_ENV: string = configService.get('NODE_ENV');

        dataSourceOptions = {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: +configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/db/migrations/*{.ts,.js}'],
          synchronize: NODE_ENV.trim() === 'development' ? true : false,
        };

        return {
          autoLoadEntities: true,
          ...dataSourceOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
