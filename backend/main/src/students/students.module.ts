import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { Info, InfoSchema } from './schemas/info.schema';
import { Measure, MeasureSchema } from './schemas/measure.schema';
import { Course, CourseSchema } from './schemas/course.schema';
import { Period, PeriodSchema } from './schemas/period.schema';
import { PassedExam, PassedExamSchema } from './schemas/passedexam.schema';
import { Exam, ExamSchema } from './schemas/exam.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]),
    MongooseModule.forFeature([{name: Info.name, schema: InfoSchema}]),
    MongooseModule.forFeature([{name: Measure.name, schema: MeasureSchema}]),
    MongooseModule.forFeature([{name: Course.name, schema: CourseSchema}]),
    MongooseModule.forFeature([{name: Period.name, schema: PeriodSchema}]),
    MongooseModule.forFeature([{name: PassedExam.name, schema: PassedExamSchema}]),
    MongooseModule.forFeature([{name: Exam.name, schema: ExamSchema}])
  ],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
