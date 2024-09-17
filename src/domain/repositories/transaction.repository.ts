import { TransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export interface TransactionRepository {
  create(transactionDto: TransactionDto): Promise<Transaction>;
  getByProductId(productId: string): Promise<Transaction>;
  getByReference(reference: string): Promise<Transaction>;
}
