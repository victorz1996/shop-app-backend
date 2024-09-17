import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { PaymentCardRepository } from '../repositories/payment.card.repository';
import { TransactionStatus } from '../dtos/enums/transaction-status.enum';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class VerifyTransactionStatusUseCase {
  constructor(
    @Inject('PaymentCardRepositoryCustom')
    private readonly paymentCardRepository: PaymentCardRepository<null, null>,
    @Inject('TransactionRepositoryCustom')
    private readonly transactionRepository: TransactionRepository,
    @Inject('ProductRepositoryCustom')
    private readonly productRepository: ProductRepository,
  ) {}
  async execute(reference: string): Promise<Transaction> {
    try {
      const transactionOnline =
        await this.paymentCardRepository.getTransactionByReference(reference);
      if (transactionOnline.data[0].status === TransactionStatus.PENDING) {
        return this.transactionRepository.getByReference(reference);
      }
      const transactionLocal =
        await this.transactionRepository.getByReference(reference);
      transactionLocal.status = transactionOnline.data[0].status;
      const transactionSaved =
        await this.transactionRepository.create(transactionLocal);
      if (transactionOnline.data[0].status === TransactionStatus.APPROVED) {
        const product = await this.productRepository.getOneById(
          transactionSaved.productId,
        );
        product.stock = product.stock - 1;
        await this.productRepository.updateProduct(product);
      }

      return transactionSaved;
    } catch (error) {
      throw new Error(error);
    }
  }
}
