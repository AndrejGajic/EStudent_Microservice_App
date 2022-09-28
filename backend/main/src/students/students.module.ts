import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { Info, InfoSchema } from './schemas/info.schema';
import { Measure, MeasureSchema } from './schemas/measure.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'MAIN_EXAMS_SERVICE', transport: Transport.TCP, options: {port: 3001} },
      { name: 'MAIN_FINANCES_SERVICE', transport: Transport.TCP, options: {port: 3002} },
      { name: 'MAIN_SURVEYS_SERVICE', transport: Transport.TCP, options: {port: 3003}}
    ]),
    MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]),
    MongooseModule.forFeature([{name: Info.name, schema: InfoSchema}]),
    MongooseModule.forFeature([{name: Measure.name, schema: MeasureSchema}])
  ],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
