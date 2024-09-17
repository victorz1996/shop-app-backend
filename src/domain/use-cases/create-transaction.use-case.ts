import { TransactionDto } from 'src/domain/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { PaymentCardRepository } from '../repositories/payment.card.repository';
import { Transaction } from '../entities/transaction.entity';
import { TransactionData } from '../dtos/transaction-data.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateTransactionUseCase {
  private readonly identitySecretKey =
    'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';
  constructor(
    @Inject('TransactionRepositoryCustom')
    private readonly transactionRepository: TransactionRepository,
    @Inject('PaymentCardRepositoryCustom')
    private readonly paymentCardRepository: PaymentCardRepository<
      null,
      TransactionData
    >,
  ) {}
  async execute(transactionData: TransactionData): Promise<Transaction> {
    try {
      transactionData.reference = uuidv4();
      transactionData.signature = await this.encryptReference(
        transactionData.reference,
        transactionData.amount_in_cents,
        transactionData.currency,
      );
      const response =
        await this.paymentCardRepository.createTransaction(transactionData);
      if (!response.data) {
        throw new Error();
      }
      const newTransactionDto: TransactionDto = {
        reference: response.data.reference,
        quantity: 1,
        productId: transactionData.productId,
        status: response.data.status,
      };

      return this.transactionRepository.create(newTransactionDto);
    } catch (error) {
      console.log(error.response.data.error.messages, 'sdjksajdklsajdklsad');
    }
  }

  private async encryptReference(
    reference: string,
    amount_in_cents: number,
    currency: string,
  ): Promise<string> {
    const cadenaConcatenada =
      reference + amount_in_cents + currency + this.identitySecretKey;
    const encondedText = new TextEncoder().encode(cadenaConcatenada);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}
