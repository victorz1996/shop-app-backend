import { Injectable } from '@nestjs/common';
import { PaymentCardRepository } from 'src/domain/repositories/payment.card.repository';
import { CardData } from '../../domain/dtos/card-data.dto';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { TransactionData } from '../../domain/dtos/transaction-data.dto';

@Injectable()
export class WompiPaymentCardImpl
  implements PaymentCardRepository<CardData, TransactionData>
{
  private readonly apiUrl = process.env.WOMPI_URL;
  private readonly publicKey = process.env.WOMPI_PUBLIC_KEY;
  private readonly secrectKey = process.env.WOMPI_SECRET_KEY;

  constructor(private readonly httpService: HttpService) {}

  async tokenizeCard(cardDetails: CardData): Promise<AxiosResponse<unknown>> {
    const url = `${this.apiUrl}/tokens/cards`;
    const response = await this.httpService.axiosRef.post(url, cardDetails, {
      headers: {
        Authorization: `Bearer ${this.publicKey}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  async createTransaction(
    transactionDetail: TransactionData,
  ): Promise<AxiosResponse<unknown>> {
    const url = `${this.apiUrl}/transactions`;
    const response = await this.httpService.axiosRef.post(
      url,
      transactionDetail,
      {
        headers: {
          Authorization: `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async getTransactionByReference(
    reference: string,
  ): Promise<AxiosResponse<any>> {
    const url = `${this.apiUrl}/transactions?reference=${reference}`;
    const response = await this.httpService.axiosRef.get(url, {
      headers: {
        Authorization: `Bearer ${this.secrectKey}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
}
