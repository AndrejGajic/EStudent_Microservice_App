import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SurveyDocument = Survey & Document;

@Schema()
export class Survey {
    @Prop()
    sifra: string;
    @Prop({type: Array<number>})
    prvo: number[];
    @Prop({type: Array<number>})
    drugo: number[];
    @Prop({type: Array<number>})
    trece: number[];
    @Prop({type: Array<number>})
    cetvrto: number[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);