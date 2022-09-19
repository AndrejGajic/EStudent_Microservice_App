import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetMeasuresDto } from './dtos/getMeasures.dto';
import { IndexDto } from './dtos/index.dto';
import { LoginDto } from './dtos/login.dto';
import { Course, CourseDocument } from './schemas/course.schema';
import { Exam, ExamDocument } from './schemas/exam.schema';
import { Info, InfoDocument } from './schemas/info.schema';
import { Measure, MeasureDocument } from './schemas/measure.schema';
import { PassedExam, PassedExamDocument } from './schemas/passedexam.schema';
import { Period, PeriodDocument } from './schemas/period.schema';
import { Student, StudentDocument } from './schemas/student.schema';

@Injectable()
export class StudentsService {

    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>, 
                @InjectModel(Info.name) private infoModel: Model<InfoDocument>,
                @InjectModel(Measure.name) private measureModel: Model<MeasureDocument>,
                @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
                @InjectModel(Period.name) private periodModel: Model<PeriodDocument>,
                @InjectModel(PassedExam.name) private passedExamModel: Model<PassedExamDocument>,
                @InjectModel(Exam.name) private examModel: Model<ExamDocument>) {}

    async getAllStudents(): Promise<Student[]> {
        return this.studentModel.find().exec();
    }

    async login(body: LoginDto): Promise<any> {
        let student = await this.studentModel.findOne({'korisnicko_ime': body.username}).exec();
        if(!student) {
            return {message: 'Не постоји студент са унетим корисничким именом!'};
        }
        else if(student.lozinka != body.password) {
            return {message: 'Унета лозинка није одговарајућа! Покушајте поново.'};
        }
        else {
            return {message: 'OK', student: student};
        }
    }

    async getAllInfos(): Promise<Info[]> {
        return this.infoModel.find({'glavno':false}).exec();
    }

    async getMainInfos(): Promise<Info[]> {
        return this.infoModel.find({'glavno':true}).exec();
    }

    async getAllMeasures(): Promise<Measure[]> {
        return this.measureModel.find().exec();
    }

    async getStudentMeasures(body: GetMeasuresDto): Promise<Measure[]> {
        return this.measureModel.find({'indeks': body.indeks}).exec();
    }

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
