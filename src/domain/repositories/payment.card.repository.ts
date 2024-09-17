import { AxiosResponse } from 'axios';

export interface PaymentCardRepository<T, G> {
  tokenizeCard(cardDetails: T): Promise<AxiosResponse<any>>;
  createTransaction(transactionDetail: G): Promise<AxiosResponse<any>>;
  getTransactionByReference(reference: string): Promise<AxiosResponse<any>>;
}
