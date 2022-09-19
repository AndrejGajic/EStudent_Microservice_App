import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document, Mongoose, Schema as MongooseSchema } from 'mongoose';
import { Exam } from './exam.schema';

export type PassedExamDocument = PassedExam & Document;

@Schema()
export class PassedExam {
    @Prop()
    student: string;
    @Prop({type: Array<Exam>})
    polozeni_ispiti: Exam;
    @Prop([Exam])
    prijavljeni_ispiti: Exam[];
}

export const PassedExamSchema = SchemaFactory.createForClass(PassedExam);