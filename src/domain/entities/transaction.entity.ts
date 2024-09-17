import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionStatus } from '../dtos/enums/transaction-status.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reference: string;

  @Column()
  quantity: number;

  @Column()
  status: TransactionStatus;

  @Column()
  productId: string;
}
