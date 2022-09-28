import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SingleTransaction } from './single_transaction';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @Prop()
    student: string;
    @Prop( {type: Array<SingleTransaction>} )
    transactions: SingleTransaction[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);