import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
    @Prop()
    id: number;
    @Prop()
    akronim: string;
    @Prop()
    sifra: string;
    @Prop()
    naziv: string;
    @Prop()
    izborni: boolean;
    @Prop()
    semestar: number;
    @Prop()
    espb: number;
    @Prop()
    nivo: string;
    @Prop()
    smer: string;
    @Prop()
    profesori: Array<string>;
    @Prop()
    asistenti: Array<string>;
}

export const CourseSchema = SchemaFactory.createForClass(Course);