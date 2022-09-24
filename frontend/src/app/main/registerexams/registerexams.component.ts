import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../exams.service';
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
    
  }

}
