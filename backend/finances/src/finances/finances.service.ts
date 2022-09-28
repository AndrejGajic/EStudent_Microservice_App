import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IndexDto } from './dtos/index.dto';
import { TransactionDto } from './dtos/transaction.dto';
import { InsertTransactionEvent } from './events/insert_transaction.event';
import { Account, AccountDocument } from './schemas/account.schema';
import { Card, CardDocument } from './schemas/card.schema';
import { SingleTransaction } from './schemas/single_transaction';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class FinancesService {

    constructor( @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
                 @InjectModel(Card.name) private cardModel: Model<CardDocument>,
                 @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}


    async transaction(body: TransactionDto): Promise<any> {
        let json = {
            'status': 'ERROR',
            'message': ''
        };
        let card: Card = await this.cardModel.findOne({'broj_kartice': body.cardNumber}).exec();
        if(!card) {
            json.message = 'Унет је непостојећи број картице!';
        }
        else if(card.cvv != body.cvv) {
            json.message = 'Унети CVV код не одговара!';
        }
        else {
            let account = await this.accountModel.findOne({'broj_racuna': card.broj_racuna}).exec();
            if(!account) {
                json.message = 'Картица није повезана ни са једним рачуном у банци!';
            }
            else if(account.iznos < body.amount) {
                json.message = 'Немате довољно средстава за трансакцију!';
            }
            else {
                account.iznos -= body.amount;
                await account.save();
                await this.insertTransaction(new InsertTransactionEvent(body.index, body.amount, 'Уплата на рачун'));
                json.status = 'OK';
            }
        }
        return json;
    }

    async getTransactions(body: IndexDto) {
        let transaction = await this.transactionModel.findOne({'student':body.index}).exec();
        return transaction.transactions;
    }


    // MICROSERVICE EVENTS

    async insertTransaction(event: InsertTransactionEvent) {
        let currDate = this.getCurrDate();
        let singleTransaction = {
            iznos: event.amount,
            opis: event.reason,
            datum: currDate
        };
        await this.transactionModel.updateOne({'student': event.index}, {$push: {transactions: singleTransaction}}).exec();
    }

    getCurrDate(): string {
        let date: Date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return "" + day + "." + month + "." + year + "."; 
    }

}
