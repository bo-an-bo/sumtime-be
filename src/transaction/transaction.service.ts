import { Injectable } from '@nestjs/common';

import { ExcelService } from '../excel/excel.service';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly excelService: ExcelService,
  ) {}

  async uploadTransactionFile(groupId: string, transactionFile: Express.Multer.File, password: string): Promise<void> {
    await this.transactionRepository.deleteMany(groupId);
    const transactions: Transaction[] = await this.excelService.convertTransactionFileToTransactionArr(
      groupId,
      transactionFile,
      password,
    );
    await this.transactionRepository.createMany(transactions);
  }

  async getTransactions(groupId: string) {
    return this.transactionRepository.getTransactions(groupId);
  }

  async getTransactionsByPeriod(groupId: string, startDate: Date, endDate: Date) {
    return this.transactionRepository.getTransactionsByPeriod(groupId, startDate, endDate);
  }
}
