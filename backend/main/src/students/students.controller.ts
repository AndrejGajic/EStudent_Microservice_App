import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { GetMeasuresDto } from './dtos/getMeasures.dto';
import { LoginDto } from './dtos/login.dto';
import { StudentsService } from './students.service';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { ActivateDto } from './dtos/activate.dto';
import { SetDebtEvent } from './events/setdebt.event';
import { TransactionEvent } from './events/transaction.event';

@Controller('students')
export class StudentsController {

    constructor(private studentService: StudentsService, 
                @Inject('MAIN_EXAMS_SERVICE') private readonly clientExams: ClientProxy,
                @Inject('MAIN_FINANCES_SERVICE') private readonly clientFinances: ClientProxy) {}


    // STUDENTS

    @Get()
    async getAll() {
        return this.studentService.getAllStudents();
    }

    @Post('/getStudent')
    async getStudent(@Body() body: GetMeasuresDto) {
        return await this.studentService.getStudent(body);
    }


    // LOGIN AND ACTIVATION

    @Post('/login')
    async login(@Body() body: LoginDto) {
        return this.studentService.login(body);
    }

    
    @Post('/activate')
    async activate(@Body() body: ActivateDto) {
        let json = await this.studentService.activate(body);
        console.log(json);
        if(json['message'] == 'OK') {
            this.clientExams.emit('activate', body.index);
        }
        return json;
    }


    // INFORMATIONS

    @Get('/getAllInfos')
    async getAllInfos() {
        return this.studentService.getAllInfos();
    }

    @Get('/getMainInfos')
    async getMainInfos() {
        return this.studentService.getMainInfos();
    }

    
    // MEASURES
    
    @Post('/getStudentMeasures')
    async getStudentMeasures(@Body() body: GetMeasuresDto) {
        // this.clientExams.emit('test', 'Testtttttttttt');
        return this.studentService.getStudentMeasures(body);
    }


    // MICROSERVICES EVENTS

    // @EventPattern('test2')
    // async test2(data: string) {
    //     console.log(data);
    // }


    @EventPattern('setDebt')
    async setDebt(event: SetDebtEvent) {
        await this.studentService.setDebt(event);
    }

    @EventPattern('transaction')
    async transaction(event: TransactionEvent) {
        let ret = await this.studentService.transaction(event);
    }

    @MessagePattern('check_balance')
    async checkBalance(index: string) {
        let message = await this.studentService.checkBalance(index);
        return message;
    }

}
