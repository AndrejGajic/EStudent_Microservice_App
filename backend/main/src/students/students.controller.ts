import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { GetMeasuresDto } from './dtos/getMeasures.dto';
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

}
