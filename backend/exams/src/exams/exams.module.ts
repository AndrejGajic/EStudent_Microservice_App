import { Module } from '@nestjs/common';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { Period, PeriodSchema } from './schemas/period.schema';
import { Exam, ExamSchema } from './schemas/exam.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentExamsInfo, StudentExamsInfoSchema } from './schemas/studentexamsinfo.schema';
import { CourseTimetable, CourseTimetableSchema } from './schemas/course_timetable.schema';
import { ExamsTimetable, ExamsTimetableSchema } from './schemas/exams_timetable.schema';


@Module({
  imports: [
    ClientsModule.register([
      { name: 'EXAMS_MAIN_SERVICE', transport: Transport.TCP, options: {port: 3000}}
    ]),
    MongooseModule.forFeature([{name: Course.name, schema: CourseSchema}]),
    MongooseModule.forFeature([{name: Period.name, schema: PeriodSchema}]),
    MongooseModule.forFeature([{name: StudentExamsInfo.name, schema: StudentExamsInfoSchema}]),
    MongooseModule.forFeature([{name: Exam.name, schema: ExamSchema}]),
    MongooseModule.forFeature([{name: CourseTimetable.name, schema: CourseTimetableSchema}]),
    MongooseModule.forFeature([{name: ExamsTimetable.name, schema: ExamsTimetableSchema}])
  ],
  controllers: [ExamsController],
  providers: [ExamsService]
})
export class ExamsModule {}
