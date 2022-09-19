import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IndexDto } from './dtos/index.dto';
import { Course, CourseDocument } from './schemas/course.schema';
import { Exam, ExamDocument } from './schemas/exam.schema';
import { PassedExam, PassedExamDocument } from './schemas/passedexam.schema';
import { Period, PeriodDocument } from './schemas/period.schema';

@Injectable()
export class ExamsService {

    constructor( @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
                 @InjectModel(Period.name) private periodModel: Model<PeriodDocument>,
                 @InjectModel(PassedExam.name) private passedExamModel: Model<PassedExamDocument>,
                 @InjectModel(Exam.name) private examModel: Model<ExamDocument>) {}

    async getAllCourses(): Promise<Course[]> {
        return this.courseModel.find().exec();
    }

    async getAllPeriods(): Promise<Period[]> {
        return this.periodModel.find().exec();
    }

    async getAllPassedExams(): Promise<PassedExam[]> {
        return this.passedExamModel.find().exec();
    }

    async getPassedExamsForStudent(body: IndexDto): Promise<any> {
        let exam: PassedExam =  await this.passedExamModel.findOne({'student': body.index}).exec();
        return exam.polozeni_ispiti;
    }

    async getActivePeriod(): Promise<Period> {
        return this.periodModel.findOne({'u_toku': true}).exec();
    }

    async getReportedExamsForStudent(body: IndexDto): Promise<any> {
        let exam: PassedExam = await this.passedExamModel.findOne({'student': body.index}).exec();
        return exam.prijavljeni_ispiti;
    }

}
