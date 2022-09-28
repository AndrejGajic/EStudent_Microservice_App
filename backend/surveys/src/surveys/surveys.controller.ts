import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { UpdateSurveyDto } from './dtos/update_survey.dto';

@Controller('surveys')
export class SurveysController {

    constructor(private surveysService: SurveysService,
                @Inject('SURVEYS_EXAMS_SERVICE') private readonly clientExams: ClientProxy) {}

    @Get('/getSurveyQuestions')
    async getSurveyQuestions() {
        return this.surveysService.getSurveyQuestions();
    }

    @Post('/updateSurvey')
    async updateSurvey(@Body() updateSurveyDto: UpdateSurveyDto) {
        // this.clientExams.emit(updateSurveysDto.code);
        return this.surveysService.updateSurvey(updateSurveyDto);
    }

}
