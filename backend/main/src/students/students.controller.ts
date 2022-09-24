import { Controller, Get, Post, Body, Req, Res, Inject } from '@nestjs/common';
import { GetMeasuresDto } from './dtos/getMeasures.dto';
import { LoginDto } from './dtos/login.dto';
import { StudentsService } from './students.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { ActivateDto } from './dtos/activate.dto';
import { SetDebtEvent } from './events/setdebt.event';

@Controller('students')
export class StudentsController {

    constructor(private studentService: StudentsService, 
                @Inject('MAIN_EXAMS_SERVICE') private readonly clientExams: ClientProxy) {}

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
        // this.clientExams.emit('test', 'Testtttttttttt');
        return this.studentService.getStudentMeasures(body);
    }

    // @EventPattern('test2')
    // async test2(data: string) {
    //     console.log(data);
    // }

    @Post('/activate')
    async activate(@Body() body: ActivateDto) {
        let json = await this.studentService.activate(body);
        console.log(json);
        if(json['message'] == 'OK') {
            this.clientExams.emit('activate', body.index);
        }
        return json;
    }

    @EventPattern('setDebt')
    async setDebt(event: SetDebtEvent) {
        await this.studentService.setDebt(event);
    }

    @Post('/getStudent')
    async getStudent(@Body() body: GetMeasuresDto) {
        return await this.studentService.getStudent(body);
    }

}
