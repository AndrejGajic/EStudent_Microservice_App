import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { GetMeasuresDto } from './dtos/getMeasures.dto';
import { IndexDto } from './dtos/index.dto';
import { LoginDto } from './dtos/login.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {

    constructor(private studentService: StudentsService) {}

    @Get()
    async getAll() {
        return this.studentService.getAllStudents();
    }

    @Post('/login')
    async login(@Body() body: LoginDto) {
        return this.studentService.login(body);
    }

    @Get('/getAllInfos')
    async getAllInfos() {
        return this.studentService.getAllInfos();
    }

    @Get('/getMainInfos')
    async getMainInfos() {
        return this.studentService.getMainInfos();
    }

    @Post('/getStudentMeasures')
    async getStudentMeasures(@Body() body: GetMeasuresDto) {
        return this.studentService.getStudentMeasures(body);
    }

    @Get('/getAllCourses')
    async getAllCourses() {
        return this.studentService.getAllCourses();
    }

    @Get('/getAllPeriods')
    async getAllPeriods() {
        return this.studentService.getAllPeriods();
    }

    @Get('/getAllPassedExams')
    async getAllPassedExams() {
        return this.studentService.getAllPassedExams();
    }

    @Post('/getPassedExamsForStudent')
    async getPassedExamsForStudent(@Body() body: IndexDto) {
        return this.studentService.getPassedExamsForStudent(body);
    }

}
