import { Controller, Get, Post, Body } from '@nestjs/common';
import { IndexDto } from './dtos/index.dto';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {


    constructor(private examsService: ExamsService) {}

    @Get('/getAllCourses')
    async getAllCourses() {
        return this.examsService.getAllCourses();
    }

    @Get('/getAllPeriods')
    async getAllPeriods() {
        return this.examsService.getAllPeriods();
    }

    @Get('/getAllPassedExams')
    async getAllPassedExams() {
        return this.examsService.getAllPassedExams();
    }

    @Post('/getPassedExamsForStudent')
    async getPassedExamsForStudent(@Body() body: IndexDto) {
        return this.examsService.getPassedExamsForStudent(body);
    }


}
