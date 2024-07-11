import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionsService {
  configService: ConfigService;
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) { }

  findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  findOne(id: number): Promise<Transaction> {
    return this.transactionsRepository.findOne({ where: { id } });
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const newTransaction = await this.transactionsRepository.save(transaction);
    await fetch(this.configService.get<string>('WEBHOOK_URI'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    });
    return newTransaction;
  }

  async update(id: number, transaction: Transaction): Promise<void> {
    await this.transactionsRepository.update(id, transaction);
  }

  async remove(id: number): Promise<void> {
    await this.transactionsRepository.delete(id);
  }
}
