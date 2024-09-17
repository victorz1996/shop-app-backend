import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDto } from 'src/domain/dtos';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmTransactionRepositoryImpl implements TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  create(transactionDto: TransactionDto): Promise<Transaction> {
    return this.repository.save(transactionDto);
  }

  getByProductId(productId: string): Promise<Transaction> {
    return this.repository.findOneBy({ productId });
  }

  getByReference(reference: string): Promise<Transaction> {
    return this.repository.findOneBy({ reference });
  }
}
