import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExamsTimetableDocument = ExamsTimetable & Document;

@Schema()
export class ExamsTimetable {
    @Prop()
    godina: string;
    @Prop()
    rok: string;
    @Prop()
    datum_od: string;
    @Prop()
    datum_do: string;
}

export const ExamsTimetableSchema = SchemaFactory.createForClass(ExamsTimetable);