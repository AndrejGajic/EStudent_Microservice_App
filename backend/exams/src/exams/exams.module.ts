import { Module } from '@nestjs/common';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { Period, PeriodSchema } from './schemas/period.schema';
import { PassedExam, PassedExamSchema } from './schemas/passedexam.schema';
import { Exam, ExamSchema } from './schemas/exam.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Course.name, schema: CourseSchema}]),
    MongooseModule.forFeature([{name: Period.name, schema: PeriodSchema}]),
    MongooseModule.forFeature([{name: PassedExam.name, schema: PassedExamSchema}]),
    MongooseModule.forFeature([{name: Exam.name, schema: ExamSchema}])
  ],
  controllers: [ExamsController],
  providers: [ExamsService]
})
export class ExamsModule {}
