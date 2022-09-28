import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
    @Prop()
    vlasnik: string;
    @Prop()
    broj_kartice: string;
    @Prop()
    cvv: string;
    @Prop()
    broj_racuna: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);