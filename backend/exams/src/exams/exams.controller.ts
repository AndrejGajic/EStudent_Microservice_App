import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { IndexDto } from './dtos/index.dto';
import { ExamsService } from './exams.service';
import { EventPattern, ClientProxy } from '@nestjs/microservices';
import { StudentExamsInfo } from './schemas/studentexamsinfo.schema';
import { Exam } from './schemas/exam.schema';
import { ChosenExamsDto } from './dtos/chosenExams.dto';
import { SetDebtEvent } from './events/setdebt.event';
import { RegisterExamDto } from './dtos/registerExam.dto';
import { deprecate } from 'util';
import { InsertTransactionEvent } from './events/insert_transaction.event';

@Controller('exams')
export class ExamsController {


    constructor(private examsService: ExamsService,
               @Inject('EXAMS_MAIN_SERVICE') private readonly clientMain: ClientProxy,
               @Inject('EXAMS_FINANCES_SERVICE') private readonly clientFinances: ClientProxy) {}


    // COURSES
    
    @Get('/getAllCourses')
    async getAllCourses() {
        return this.examsService.getAllCourses();
    }

    // PERIODS

    @Get('/getAllPeriods')
    async getAllPeriods() {
        return this.examsService.getAllPeriods();
    }

    // STUDENT EXAMS INFO

    @Post('/getStudentExamsInfo')
    async getStudentExamsInfo(@Body() body: IndexDto) {
        return this.examsService.getStudentExamsInfo(body);
    }

    // PASSED EXAMS

    @Get('/getAllPassedExams')
    async getAllPassedExams() {
        return this.examsService.getAllPassedExams();
    }

    @Post('/getPassedExamsForStudent')
    async getPassedExamsForStudent(@Body() body: IndexDto) {
        // this.clientMain.emit('test2', 'Testttt222');
        return this.examsService.getPassedExamsForStudent(body);
    }

    // REGISTERED EXAMS

    @Post('/getRegisteredExamsForStudent')
    async getRegisteredExamsForStudent(@Body() body: IndexDto) {
        return this.examsService.getRegisteredExamsForStudent(body);
    }

    @Post('/getExamsThatCanBeRegistered')
    async getExamsThatCanBeRegistered(@Body() body: IndexDto) {
        return this.examsService.getExamsThatCanBeRegistered(body);
    }

    // CHOSEN COURSES

    @Post('/getStudentChosenCourses')
    async getStudentCourses(@Body() body: IndexDto) {
        return this.examsService.getStudentChosenCourses(body);
    }

    @Post('/chooseCoursesForStudent')
    async chooseCoursesForStudent(@Body() body: ChosenExamsDto) {
        this.clientMain.emit('setDebt', new SetDebtEvent(body.index, Math.round(body.price)));
        return await this.examsService.chooseCoursesForStudent(body);
    }

    // TIMETABLES

    @Get('/getCurrCourseTimetable')
    async getCurrCourseTimetable() {
        return await this.examsService.getCurrCourseTimetable();
    }

    @Get('/getCurrExamsTimetable')
    async getCurrExamsTimetable() {
        return await this.examsService.getCurrExamsTimetable();
    }

    // EXAM REGISTERING

    @Post('/registerExam')
    async registerExam(@Body() body: RegisterExamDto) {
        let num = await this.examsService.getNumberOfRegistration(body);
        if(num >= 3) {
            let message = await this.clientMain.send('check_balance', body.index).toPromise();
            if(message != 'OK') {
                return {
                    'status' : 'ERROR',
                    'message' : 'Немате довољно средстава! Потребно је 1000 РСД за пријаву овог испита.'
                };
            }
            else {
                this.clientFinances.emit('insert_transaction', new InsertTransactionEvent(body.index, 1000, 'Надокнада за пријаву испита'));
            }
        }
        return await this.examsService.registerExam(body);
    }

    @Post('unregisterExam')
    async unregisterExam(@Body() body: RegisterExamDto) {
        return await this.examsService.unregisterExam(body);
    }

    // MICROSERVICE EVENTS

    // @EventPattern('test')
    // async test(data: string) {
    //     console.log(data);
    // }

    @EventPattern('activate')
    async activate(index: string) {
        this.examsService.createStudentInfo(index);
    }
}
