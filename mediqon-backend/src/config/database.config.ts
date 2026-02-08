import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('DB_HOST'),
  port: Number(config.get<number>('DB_PORT')),
  username: config.get<string>('DB_USER'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),

  // 🔑 THIS IS THE IMPORTANT PART
  entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
  synchronize: true, // DEV ONLY
});
