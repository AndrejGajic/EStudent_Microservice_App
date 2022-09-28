import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { EventPattern, ClientProxy } from '@nestjs/microservices';
import { IndexDto } from './dtos/index.dto';
import { TransactionDto } from './dtos/transaction.dto';
import { InsertTransactionEvent } from './events/insert_transaction.event';
import { TransactionEvent } from './events/transaction.event';
import { FinancesService } from './finances.service';

@Controller('finances')
export class FinancesController {

    constructor(private financesService: FinancesService,
                @Inject('FINANCES_MAIN_SERVICE') private readonly clientMain: ClientProxy) {}

    @Post('/transaction')
    async transaction(@Body() body: TransactionDto) {
        let json = await this.financesService.transaction(body);
        if(json['status'] == 'OK') {
            this.clientMain.emit('transaction', new TransactionEvent(body.index, body.amount));
        }
        return json;
    }

    @Post('/getTransactions')
    async getTransactions(@Body() body: IndexDto) {
        return this.financesService.getTransactions(body);
    }


    // MICROSERVICE EVENTS

    @EventPattern('insert_transaction')
    async insertTransaction(@Body() event: InsertTransactionEvent) {
        this.financesService.insertTransaction(event);
    }

}
