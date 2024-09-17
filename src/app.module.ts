import { WompiPaymentCardImpl } from './infrastructure/driven-adapters/wompi-payment-card-repository-impl';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './infrastructure/entry-points/products/products.controller';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfigProd from './config/orm.config.prod';
import { Product } from './domain/entities/product.entity';
import { GetProductsUseCase } from './domain/use-cases/get-products.use-case';
import { TypeOrmProductRepositoryImpl } from './infrastructure/driven-adapters/typeorm-product-repository-impl';
import { TypeOrmTransactionRepositoryImpl } from './infrastructure/driven-adapters/typeorm-transaction-repository-impl';
import { TransactionsController } from './infrastructure/entry-points/transactions/transactions.controller';
import { Transaction } from './domain/entities/transaction.entity';
import { CreateTransactionUseCase } from './domain/use-cases/create-transaction.use-case';
import { VerifyTransactionStatusUseCase } from './domain/use-cases/verify-transaction-status.use-case';
import { HttpModule } from '@nestjs/axios';
import { TokenizeCardUseCase } from './domain/use-cases/tokenize-card.use-case';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    TypeOrmModule.forFeature([Product, Transaction]),
  ],
  controllers: [AppController, ProductsController, TransactionsController],
  providers: [
    {
      provide: 'ProductRepositoryCustom',
      useClass: TypeOrmProductRepositoryImpl,
    },
    {
      provide: 'TransactionRepositoryCustom',
      useClass: TypeOrmTransactionRepositoryImpl,
    },
    {
      provide: 'PaymentCardRepositoryCustom',
      useClass: WompiPaymentCardImpl,
    },
    AppService,
    GetProductsUseCase,
    CreateTransactionUseCase,
    VerifyTransactionStatusUseCase,
    TokenizeCardUseCase,
  ],
  exports: [
    'ProductRepositoryCustom',
    'TransactionRepositoryCustom',
    'PaymentCardRepositoryCustom',
  ],
})
export class AppModule {}
