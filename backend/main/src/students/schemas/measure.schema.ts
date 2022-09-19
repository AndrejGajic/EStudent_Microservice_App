import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeasureDocument = Measure & Document;

@Schema()
export class Measure {
    @Prop()
    id: number;
    @Prop()
    student: string;
    @Prop()
    indeks: string;
    @Prop()
    razlog: string;
    @Prop()
    zabrana: number;
    @Prop()
    datum_donosenja: string;
    @Prop()
    istekla: boolean;
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);