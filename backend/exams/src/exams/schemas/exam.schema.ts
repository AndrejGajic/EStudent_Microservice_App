import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document, Mongoose, Schema as MongooseSchema } from 'mongoose';

export type ExamDocument = Exam & Document;


export class Exam {
    @Prop()
    sifra: string;
    @Prop()
    ocena: number;
    @Prop()
    rok: string;
    @Prop()
    datum_polaganja: string;
    @Prop()
    potpisao: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);