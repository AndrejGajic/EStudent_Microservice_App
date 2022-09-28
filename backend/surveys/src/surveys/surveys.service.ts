import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSurveyDto } from './dtos/update_survey.dto';
import { Survey, SurveyDocument } from './schemas/survey.schema';
import { SurveyTemplate, SurveyTemplateDocument } from './schemas/surveytemplate.schema';

@Injectable()
export class SurveysService {

    constructor(@InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>, 
                @InjectModel(SurveyTemplate.name) private surveyTemplateModel: Model<SurveyTemplateDocument>) {}

    async getSurveyQuestions() {
        return this.surveyTemplateModel.find().exec();
    }

    async updateSurvey(body: UpdateSurveyDto) {
        let survey = await this.surveyModel.findOne({'sifra':body.code}).exec();
        if(!survey) {
            return {
                status: 'ERROR'
            };
        }
        else {
            survey.prvo[body.answer_1 - 1]++;
            survey.drugo[body.answer_2 - 1]++;
            survey.trece[body.answer_3 - 1]++;
            survey.cetvrto[body.answer_4 - 1]++;
            await survey.save();
            return {
                status : 'OK'
            };
        }
    }

}
