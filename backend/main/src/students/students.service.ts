import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivateDto } from './dtos/activate.dto';
import { GetMeasuresDto } from './dtos/getMeasures.dto';
import { LoginDto } from './dtos/login.dto';
import { SetDebtEvent } from './events/setdebt.event';
import { TransactionEvent } from './events/transaction.event';
import { Info, InfoDocument } from './schemas/info.schema';
import { Measure, MeasureDocument } from './schemas/measure.schema';
import { Student, StudentDocument } from './schemas/student.schema';

const HARDCODED_CODE = 'STUDENT_ETF_2022';

@Injectable()
export class StudentsService {

    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>, 
                @InjectModel(Info.name) private infoModel: Model<InfoDocument>,
                @InjectModel(Measure.name) private measureModel: Model<MeasureDocument>) {}


    // STUDENTS
    
    async getAllStudents(): Promise<Student[]> {
        return this.studentModel.find().exec();
    }

    async getStudent(body: GetMeasuresDto): Promise<any> {
        let student: any = await this.studentModel.findOne({'indeks': body.indeks}).exec();
        return student;
    }

    async checkBalance(index: string): Promise<string> {
        let student = await this.studentModel.findOne({'indeks': index}).exec();
        if(student.novac >= 1000) {
            student.novac -= 1000;
            await student.save();
            return 'OK';
        }
        else return 'NOT_OK';
    }


    // LOGIN AND ACTIVATION

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

    async activate(body: ActivateDto): Promise<any> {
        if(body.code != HARDCODED_CODE) {
            return {
                'message': 'Код који сте унели није исправан!'
            };
        }
        else {
            await this.studentModel.findOneAndUpdate({'indeks': body.index}, {'aktiviran': true}).exec();
            return {
                'message': 'OK'
            };
        }
    }


    // INFORMATIONS


    async getAllInfos(): Promise<Info[]> {
        return this.infoModel.find({'glavno':false}).exec();
    }

    async getMainInfos(): Promise<Info[]> {
        return this.infoModel.find({'glavno':true}).exec();
    }


    // MEASURES

    async getAllMeasures(): Promise<Measure[]> {
        return this.measureModel.find().exec();
    }

    async getStudentMeasures(body: GetMeasuresDto): Promise<Measure[]> {
        return this.measureModel.find({'indeks': body.indeks}).exec();
    }


    // MICROSERVICES EVENTS

    async setDebt(event: SetDebtEvent): Promise<any> {
        return await this.studentModel.findOneAndUpdate({'indeks': event.index}, {'dugovanje': event.price}).exec();
    }

    async transaction(event: TransactionEvent) {
        let student = await this.studentModel.findOne({'indeks': event.index}).exec();
        if(student.dugovanje >= event.amount) {
            student.dugovanje -= event.amount;
            event.amount = 0;
        }
        else if(student.dugovanje > 0) {
            event.amount -= student.dugovanje;
            student.dugovanje = 0;
        }
        student.novac += Number(event.amount);
        await student.save();
    }
}
