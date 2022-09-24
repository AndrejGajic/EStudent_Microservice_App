import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document, Mongoose, Schema as MongooseSchema } from 'mongoose';
import { Exam } from './exam.schema';

export type StudentExamsInfoDocument = StudentExamsInfo & Document;

@Schema()
export class StudentExamsInfo {
    @Prop()
    student: string;
    @Prop({type: Array<Exam>})
    polozeni_ispiti: Exam[];
    @Prop([Exam])
    prijavljeni_ispiti: Exam[];
    @Prop({type: Array<Exam>})
    izabrani_predmeti: Exam[];
    @Prop()
    espb_prva: number;
    @Prop()
    espb_druga: number;
    @Prop()
    espb_treca: number;
    @Prop()
    espb_cetvrta: number;
}

export const StudentExamsInfoSchema = SchemaFactory.createForClass(StudentExamsInfo);