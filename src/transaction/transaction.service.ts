import { Injectable } from '@nestjs/common';

import { ExcelService } from '../excel/excel.service';
import { GetTransactionPeriodDto } from './dto/get-transaction-period.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly excelService: ExcelService,
  ) {}

  createMany(transactions: Transaction[]): Promise<void> {
    return this.transactionRepository.createMany(transactions);
  }

  async uploadTransactionFile(
    groupId: string,
    transactionFile: Express.Multer.File,
  ): Promise<void> {
    const transactions: Transaction[] =
      await this.excelService.convertTransactionFileToTransactionArr(
        groupId,
        transactionFile,
      );
    await this.createMany(transactions);
  }

  async getTransactions(groupId: string) {
    return this.transactionRepository.getTransactions(groupId);
  }

  async getTransactionByPeriod(
    groupId: string,
    transactionDto: GetTransactionPeriodDto,
  ) {
    return this.transactionRepository.getTransactionByPeriod(
      groupId,
      transactionDto,
    );
  }
}