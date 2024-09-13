import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/domain/entities/product.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: '<YOUR_HOST>',
    port: 5432,
    username: '<YOUR_PRODUCTION_DATABASE_USERNAME>',
    password: '<YOUR_PRODUCTION_DATABASE_PASSWORD>',
    database: 'shop-app',
    entities: [Product],
    synchronize: false, // Disable this always in production
  }),
);
