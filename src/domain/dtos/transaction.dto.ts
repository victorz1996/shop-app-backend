import { TransactionStatus } from './enums/transaction-status.enum';

export class TransactionDto {
  reference: string;
  quantity: number;
  productId: string;
  status: TransactionStatus;
}
