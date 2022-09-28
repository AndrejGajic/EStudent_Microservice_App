import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop()
    broj_racuna: string;
    @Prop()
    iznos: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);