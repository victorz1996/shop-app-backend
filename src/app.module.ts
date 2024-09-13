import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './infrastructure/entry-points/products/products.controller';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfigProd from './config/orm.config.prod';
import { Product } from './domain/entities/product.entity';
import { GetProducts } from './domain/use-cases/get-products.use-case';
import { TypeOrmProductRepositoryImpl } from './infrastructure/driven-adapters/typeorm-product-repository-impl';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [AppController, ProductsController],
  providers: [
    {
      provide: 'ProductRepositoryCustom',
      useClass: TypeOrmProductRepositoryImpl,
    },
    AppService,
    GetProducts,
  ],
  exports: ['ProductRepositoryCustom'],
})
export class AppModule {}
