import { VerifyTransactionStatusUseCase } from '../../../domain/use-cases/verify-transaction-status.use-case';
import { CreateTransactionUseCase } from './../../../domain/use-cases/create-transaction.use-case';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TokenizeCardUseCase } from 'src/domain/use-cases/tokenize-card.use-case';
import { TransactionData } from 'src/domain/dtos/transaction-data.dto';
import { CardData } from 'src/domain/dtos/card-data.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly verifyTransactionStatusUseCase: VerifyTransactionStatusUseCase,
    private readonly tokenizeCardUseCase: TokenizeCardUseCase,
  ) {}

  @Post()
  async create(@Body() input: any) {
    const transaction = await this.createTransactionUseCase.execute(input);
    return { success: true, data: transaction };
  }

  @Post('tokenize')
  async tokenizeCard(@Body() cardDetails: CardData) {
    const tokenizedCard = this.tokenizeCardUseCase.execute(cardDetails);
    return tokenizedCard;
  }

  @Post('create-transaction-online')
  async createTransaction(@Body() transactionDetails: TransactionData) {
    const transaction =
      await this.createTransactionUseCase.execute(transactionDetails);
    return { success: true, data: transaction };
  }

  @Get('verify-transaction-online/:reference')
  async findOneByReference(@Param('reference') reference) {
    const transation =
      await this.verifyTransactionStatusUseCase.execute(reference);
    return { success: true, data: transation };
  }
}
