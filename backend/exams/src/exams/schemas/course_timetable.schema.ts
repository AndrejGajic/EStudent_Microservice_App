import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseTimetableDocument = CourseTimetable & Document;

@Schema()
export class CourseTimetable {
    @Prop()
    godina: string;
    @Prop()
    datum_od: string;
    @Prop()
    datum_do: string;
}

export const CourseTimetableSchema = SchemaFactory.createForClass(CourseTimetable);