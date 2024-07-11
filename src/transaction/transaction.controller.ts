import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Client')
  create(@Body() transactionDto: Transaction, @Req() req) {
    return this.transactionsService.create({ ...transactionDto, user: req.user });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin', 'Client')
  findOne(@Param('id') id: string, @Req() req) {
    if (req.user.role !== 'Admin' && req.user.id !== +id) {
      throw new UnauthorizedException();
    }
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  update(@Param('id') id: string, @Body() transactionDto: Transaction) {
    return this.transactionsService.update(+id, transactionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
