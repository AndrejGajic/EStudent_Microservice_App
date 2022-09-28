import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancesService } from './finances.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FinancesController } from './finances.controller';
import { Account, AccountSchema } from './schemas/account.schema';
import { Card, CardSchema } from './schemas/card.schema';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [
    ClientsModule.register([
        { name: 'FINANCES_MAIN_SERVICE', transport: Transport.TCP, options: {port: 3000}}
    ]),
    MongooseModule.forFeature([{name: Account.name, schema: AccountSchema}]),
    MongooseModule.forFeature([{name: Card.name, schema: CardSchema}]),
    MongooseModule.forFeature([{name: Transaction.name, schema: TransactionSchema}])
  ],
  providers: [FinancesService],
  controllers: [FinancesController]
})
export class FinancesModule {}
