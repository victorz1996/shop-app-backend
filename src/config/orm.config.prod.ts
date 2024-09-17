import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/domain/entities/product.entity';
import { Transaction } from 'typeorm';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'shop-app',
    entities: [Product, Transaction],
    synchronize: false,
  }),
);
