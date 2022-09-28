import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../services/exams.service'
import { Ispit } from '../models/ispit';
import { IspitInfo } from '../models/ispit_info';
import { PrijavaIspitaRok } from '../models/prijava_ispita_rok';
import { Student } from '../models/student';
import { StudentIspitInfo } from '../models/studentispitinfo';

@Component({
  selector: 'app-registerexams',
  templateUrl: './registerexams.component.html',
  styleUrls: ['./registerexams.component.css']
})
export class RegisterexamsComponent implements OnInit {

  constructor(private examService: ExamsService) { }

  student: Student = null;
  info: StudentIspitInfo = null;
  examsForRegistering: IspitInfo[] = [];
  timetable: PrijavaIspitaRok = null;

  errorMessage: string = '';

  ngOnInit(): void {
    this.examService.getCurrExamsTimetable().subscribe((timetable: PrijavaIspitaRok) => {
      this.timetable = timetable;
    });
    this.student = JSON.parse(localStorage.getItem('student'));
    this.examService.getExamsThatCanBeRegistered(this.student.indeks).subscribe((exams: IspitInfo[]) => {
      this.examsForRegistering = exams;
    });
  }

  register(i: number) {
    this.examService.registerExam(this.student.indeks, this.examsForRegistering[i].sifra).subscribe((json) => {
      console.log(json);
      if(json['status'] != 'ERROR') {
        alert(json['message']);
        window.location.reload();
      }
      else {
        this.errorMessage = json['message'];
      }
    });
  }

}
