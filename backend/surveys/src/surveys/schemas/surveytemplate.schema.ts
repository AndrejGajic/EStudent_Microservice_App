import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SurveyTemplateDocument = SurveyTemplate & Document;

@Schema()
export class SurveyTemplate {
    @Prop()
    pitanje_1: string;
    @Prop()
    pitanje_2: string;
    @Prop()
    pitanje_3: string;
    @Prop()
    pitanje_4: string;
}

export const SurveyTemplateSchema = SchemaFactory.createForClass(SurveyTemplate);