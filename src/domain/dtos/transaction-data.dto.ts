export enum PaymentMethodTypes {
  CARD = 'CARD',
}
interface PaymentMethod {
  type: PaymentMethodTypes;
  installments: number;
  token: string;
}
export class TransactionData {
  productId?: string;
  reference: string;
  currency: string;
  signature?: string;
  acceptance_token: string;
  amount_in_cents: number;
  customer_email: string;
  payment_method: PaymentMethod;
}
