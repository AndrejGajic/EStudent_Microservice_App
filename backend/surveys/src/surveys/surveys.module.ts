import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Survey, SurveySchema } from './schemas/survey.schema';
import { SurveyTemplate, SurveyTemplateSchema } from './schemas/surveytemplate.schema';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'SURVEYS_EXAMS_SERVICE', transport: Transport.TCP, options: {port: 3001} }
    ]),
    MongooseModule.forFeature([{name: Survey.name, schema: SurveySchema}]),
    MongooseModule.forFeature([{name: SurveyTemplate.name, schema: SurveyTemplateSchema}]),
  ],
  controllers: [SurveysController],
  providers: [SurveysService]
})
export class SurveysModule {}
