import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { Info, InfoSchema } from './schemas/info.schema';
import { Measure, MeasureSchema } from './schemas/measure.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]),
    MongooseModule.forFeature([{name: Info.name, schema: InfoSchema}]),
    MongooseModule.forFeature([{name: Measure.name, schema: MeasureSchema}])
  ],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
