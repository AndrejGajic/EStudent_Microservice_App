import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { UpdateSurveyDto } from './dtos/update_survey.dto';
import { UpdateSurveysEvent } from './events/update_surveys.event';

@Controller('surveys')
export class SurveysController {

    constructor(private surveysService: SurveysService,
                @Inject('SURVEYS_EXAMS_SERVICE') private readonly clientExams: ClientProxy) {}

    @Get('/getSurveyQuestions')
    async getSurveyQuestions() {
        return this.surveysService.getSurveyQuestions();
    }

    @Post('/updateSurvey')
    async updateSurvey(@Body() body: UpdateSurveyDto) {
        let json = await this.surveysService.updateSurvey(body);
        if(json['status'] == 'OK') {
            this.clientExams.emit('update_surveys', new UpdateSurveysEvent(body.index, body.code));
        }
        return json;
    }

}
