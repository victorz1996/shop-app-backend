import { Inject, Injectable } from '@nestjs/common';
import { PaymentCardRepository } from '../repositories/payment.card.repository';
import { AxiosResponse } from 'axios';
import { CardData } from '../dtos/card-data.dto';

@Injectable()
export class TokenizeCardUseCase {
  constructor(
    @Inject('PaymentCardRepositoryCustom')
    private readonly paymentCardRepository: PaymentCardRepository<
      CardData,
      null
    >,
  ) {}
  execute(transactionDto: CardData): Promise<AxiosResponse<unknown>> {
    return this.paymentCardRepository.tokenizeCard(transactionDto);
  }
}
