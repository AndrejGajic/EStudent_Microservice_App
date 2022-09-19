import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PeriodDocument = Period & Document;

@Schema()
export class Period {
    @Prop()
    naziv: string;
    @Prop()
    datum_od: string;
    @Prop()
    datum_do: string;
    @Prop()
    u_toku: boolean;
    @Prop()
    prosao: boolean;
}

export const PeriodSchema = SchemaFactory.createForClass(Period);