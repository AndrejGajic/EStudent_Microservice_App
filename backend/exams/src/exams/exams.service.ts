import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChosenExamsDto } from './dtos/chosenExams.dto';
import { IndexDto } from './dtos/index.dto';
import { Course, CourseDocument } from './schemas/course.schema';
import { CourseTimetable, CourseTimetableDocument } from './schemas/course_timetable.schema';
import { Exam, ExamDocument } from './schemas/exam.schema';
import { ExamsTimetable, ExamsTimetableDocument } from './schemas/exams_timetable.schema';
import { Period, PeriodDocument } from './schemas/period.schema';
import { StudentExamsInfo, StudentExamsInfoDocument } from './schemas/studentexamsinfo.schema';

@Injectable()
export class ExamsService {

    constructor( @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
                 @InjectModel(Period.name) private periodModel: Model<PeriodDocument>,
                 @InjectModel(StudentExamsInfo.name) private studentExamsInfoModel: Model<StudentExamsInfoDocument>,
                 @InjectModel(Exam.name) private examModel: Model<ExamDocument>,
                 @InjectModel(CourseTimetable.name) private courseTimetableModel: Model<CourseTimetableDocument>,
                 @InjectModel(ExamsTimetable.name) private examsTimetableModel: Model<ExamsTimetableDocument>) {}


    // COURSES

    async getAllCourses(): Promise<Course[]> {
        return this.courseModel.find().exec();
    }

    // PERIODS

    async getAllPeriods(): Promise<Period[]> {
        return this.periodModel.find().exec();
    }

    async getActivePeriod(): Promise<Period> {
        return this.periodModel.findOne({'u_toku': true}).exec();
    }

    // STUDENT EXAMS INFO

    async getStudentExamsInfo(body: IndexDto): Promise<StudentExamsInfo> {
        return this.studentExamsInfoModel.findOne({'student':body.index}).exec();
    }

    // PASSED EXAMS

    async getAllPassedExams(): Promise<StudentExamsInfo[]> {
        return this.studentExamsInfoModel.find().exec();
    }

    async getPassedExamsForStudent(body: IndexDto): Promise<any> {
        let info: StudentExamsInfo =  await this.studentExamsInfoModel.findOne({'student': body.index}).exec();
        let courses: Course[] = await this.courseModel.find().exec();
        let passedExams: Exam[] = info.polozeni_ispiti;
        let passed: any[] = [];
        let totalEspb: number = 0;
        let avgMark: number = 0;
        for(let i = 0; i < passedExams.length; i++) {
            let currCourse = courses.find(obj => {return obj.sifra == passedExams[i].sifra});
            let json = {
                sifra: passedExams[i].sifra, 
                naziv: currCourse.naziv, 
                izborni: currCourse.izborni, 
                ocena: passedExams[i].ocena, 
                semestar: passedExams[i].semestar,
                espb: currCourse.espb, 
                rok: passedExams[i].rok,
                datum_polaganja: passedExams[i].datum_polaganja,
                potpisao: passedExams[i].potpisao
            };
            passed.push(json);
            totalEspb += currCourse.espb;
            avgMark += passedExams[i].ocena;
        }
        avgMark = Number((avgMark / passedExams.length).toFixed(2));
        return {
            passed: passed,
            totalEspb: totalEspb,
            avgMark: avgMark
        };
    }

    // REGISTERED EXAMS

    async getRegisteredExamsForStudent(body: IndexDto): Promise<any> {
        let exam: StudentExamsInfo = await this.studentExamsInfoModel.findOne({'student': body.index}).exec();
        return exam.prijavljeni_ispiti;
    }

    async getExamsThatCanBeRegistered(body: IndexDto): Promise<Exam[]> {
        let info: StudentExamsInfo = await this.studentExamsInfoModel.findOne({'student': body.index}).exec();
        let courses = this.getAllCourses();
        let chosen: Exam[] = info.izabrani_predmeti;
        let exams: any[] = [];
        let nextPeriod = this.getCurrExamsTimetable();
        if(!nextPeriod) return exams;
        let sem = (await nextPeriod).rok.split(' ')[0];
        let winterSem: boolean = true;
        let summerSem: boolean = true;
        if(sem == 'januar') summerSem = false;
        else if(sem == 'jun') winterSem = false;
        for(let i = 0; i < chosen.length; i++) {
            let temp = info.polozeni_ispiti.find(obj => {return obj.sifra == chosen[i].sifra});
            if(!temp) {
                let courseSem = chosen[i].semestar;
                if(courseSem % 2 && winterSem || !(courseSem % 2) && summerSem) {
                    let currCourse = (await courses).find(obj => {return obj.sifra == chosen[i].sifra});
                    let json = {
                        sifra: chosen[i].sifra, 
                        naziv: currCourse.naziv, 
                        izborni: currCourse.izborni, 
                        ocena: chosen[i].ocena, 
                        semestar: chosen[i].semestar,
                        espb: currCourse.espb, 
                        rok: chosen[i].rok,
                        datum_polaganja: chosen[i].datum_polaganja,
                        potpisao: chosen[i].potpisao
                    };
                    exams.push(json);
                }
            }
        }
        return exams;
    }

    // CHOSEN COURSES

    async getStudentChosenCourses(body: IndexDto): Promise<any> {
        let info: StudentExamsInfo =  await this.studentExamsInfoModel.findOne({'student': body.index}).exec();
        let courses: Course[] = await this.courseModel.find().exec();
        let chosenCourses: Exam[] = info.izabrani_predmeti;
        let chosen: any[] = [];
        for(let i = 0; i < chosenCourses.length; i++) {
            let currCourse = courses.find(obj => {return obj.sifra == chosenCourses[i].sifra});
            let json = {
                sifra: chosenCourses[i].sifra, 
                naziv: currCourse.naziv, 
                izborni: currCourse.izborni, 
                ocena: chosenCourses[i].ocena, 
                semestar: chosenCourses[i].semestar,
                espb: currCourse.espb, 
                rok: chosenCourses[i].rok,
                datum_polaganja: chosenCourses[i].datum_polaganja,
                potpisao: chosenCourses[i].potpisao
            };
            chosen.push(json);
        }
        return chosen;
    }

    async chooseCoursesForStudent(body: ChosenExamsDto): Promise<any> {
        return await this.studentExamsInfoModel.findOneAndUpdate({'student': body.index}, {'izabrani_predmeti': body.chosen}).exec();
    }


    // TIMETABLES

    async getCurrCourseTimetable(): Promise<CourseTimetable> {
        let currDate = new Date();
        let date_from: Date = null;
        let date_to: Date = null;
        let timetable: CourseTimetable = null;
        let timetables: CourseTimetable[] = await this.courseTimetableModel.find().exec();
        for(let i = 0; i < timetables.length; i++) {
            let from = timetables[i].datum_od.split('.');
            let to = timetables[i].datum_do.split('.');
            date_from = new Date(Number(from[2]), Number(from[1]) - 1, Number(from[0]) + 1);
            date_to = new Date(Number(to[2]), Number(to[1]) - 1, Number(to[0]) + 1);
            if(date_from <= currDate && date_to >= currDate) {
                timetable = timetables[i];
                break;
            }
        }
        return timetable;
    }

    async getCurrExamsTimetable(): Promise<ExamsTimetable> {
        let currDate = new Date();
        let date_from: Date = null;
        let date_to: Date = null;
        let timetable: ExamsTimetable = null;
        let timetables: ExamsTimetable[] = await this.examsTimetableModel.find().exec();
        for(let i = 0; i < timetables.length; i++) {
            let from = timetables[i].datum_od.split('.');
            let to = timetables[i].datum_do.split('.');
            date_from = new Date(Number(from[2]), Number(from[1]) - 1, Number(from[0]) + 1);
            date_to = new Date(Number(to[2]), Number(to[1]) - 1, Number(to[0]) + 1);
            if(date_from <= currDate && date_to >= currDate) {
                timetable = timetables[i];
                break;
            }
        }
        return timetable;
    }

    
    // MICROSERVICE EVENTS

    async createStudentInfo(index: string) {
        let studentInfo = await this.studentExamsInfoModel.find({'indeks':index}).exec();
        console.log(studentInfo);
        if(studentInfo) return;
        let info: StudentExamsInfo = new StudentExamsInfo();
        info.student = index;
        info.polozeni_ispiti = [];
        info.prijavljeni_ispiti = [];
        info.izabrani_predmeti = [];
        let exam1: Exam = new Exam();
        exam1.sifra = '13С111П1';
        exam1.broj_polaganja = 0;
        exam1.izborni = false;
        exam1.semestar = 1;
        info.izabrani_predmeti.push(exam1);
        exam1 = new Exam();
        exam1.sifra = '13С081М1';
        exam1.broj_polaganja = 0;
        exam1.izborni = false;
        exam1.semestar = 1;
        info.izabrani_predmeti.push(exam1);
        exam1 = new Exam();
        exam1.sifra = '13С041ОЕ';
        exam1.broj_polaganja = 0;
        exam1.izborni = false;
        exam1.semestar = 1;
        info.izabrani_predmeti.push(exam1);
        exam1 = new Exam();
        exam1.sifra = '13С061Ф';
        exam1.broj_polaganja = 0;
        exam1.izborni = false;
        exam1.semestar = 1;
        info.izabrani_predmeti.push(exam1);
        exam1 = new Exam();
        exam1.sifra = '13С111ПП1';
        exam1.broj_polaganja = 0;
        exam1.izborni = false;
        exam1.semestar = 1;
        info.izabrani_predmeti.push(exam1);
        exam1 = new Exam();
        exam1.sifra = '13С091ЕЈН';
        exam1.broj_polaganja = 0;
        exam1.izborni = false;
        exam1.semestar = 1;
        info.izabrani_predmeti.push(exam1);
        const newInfo = new this.studentExamsInfoModel({
            student: info.student,
            polozeni_ispiti: info.polozeni_ispiti,
            prijavljeni_ispiti: info.prijavljeni_ispiti,
            izabrani_predmeti: info.izabrani_predmeti,
            espb_prva: 0,
            espb_druga: 0,
            espb_treca: 0,
            espb_cetvrta: 0
        });
        console.log(newInfo);
        await newInfo.save();
    }

}
