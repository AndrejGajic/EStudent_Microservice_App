import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamsService } from '../services/exams.service'
import { BiranjePredmetaRok } from '../models/biranje_predmeta_rok';
import { Ispit } from '../models/ispit';
import { IspitInfo } from '../models/ispit_info';
import { Student } from '../models/student';

@Component({
  selector: 'app-chosencourses',
  templateUrl: './chosencourses.component.html',
  styleUrls: ['./chosencourses.component.css']
})

export class ChosencoursesComponent implements OnInit {

  constructor(private examService: ExamsService, private router: Router) { }

  espbPrice: number = 4058.33;
  student: Student = null;
  chosen: IspitInfo[] = [];

  totalPrice: number = 0;
  totalEspb: number = 0;

  activeCoursesTimetable: boolean = false;
  cannotChoose: boolean = false;

  ngOnInit(): void {
    this.student = JSON.parse(localStorage.getItem('student'));
    this.examService.getCurrCourseTimetable().subscribe((timetable: BiranjePredmetaRok) => {
      if(timetable) this.activeCoursesTimetable = true;
    });
    this.examService.getStudentChosenCourses(this.student.indeks).subscribe((courses: IspitInfo[]) => {
      console.log(courses);
      this.chosen = courses;
      this.calculatePrice();
    });
  }

  calculatePrice() {
    for(let i = 0; i < this.chosen.length; i++) {
      this.totalEspb += this.chosen[i].espb;
      this.totalPrice += Number(Math.round(this.chosen[i].espb * this.espbPrice).toFixed(2));
    }
    if(this.student.budzet) {
      this.totalPrice = 0;
    }
    else {
      this.totalPrice = Number(this.totalPrice.toFixed(2));
    }
  }

  choose() {
    if(this.activeCoursesTimetable) {
      this.router.navigate(['/coursechoosing']);
    }
    else {
      this.cannotChoose = true;
    }
  }

}
