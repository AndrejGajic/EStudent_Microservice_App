import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamsService } from  '../services/exams.service'
import { Ispit } from '../models/ispit';
import { IspitInfo } from '../models/ispit_info';
import { Kurs } from '../models/kurs';
import { Student } from '../models/student';
import { StudentIspitInfo } from '../models/studentispitinfo';

const MAX_ESPB = 60;
const MAX_SEM = [0, 2, 1, 1, 1, 3, 3, 2, 1];

@Component({
  selector: 'app-coursechoosing',
  templateUrl: './coursechoosing.component.html',
  styleUrls: ['./coursechoosing.component.css']
})
export class CoursechoosingComponent implements OnInit {

  constructor(private examsService: ExamsService, private router: Router) { }

  student: Student = null;
  espbPrice: number = 4058.33;

  studentExamsInfo: StudentIspitInfo;

  semsO: Kurs[][] = [[],[],[],[],[],[],[],[],[]];
  semsI: Kurs[][] = [[],[],[],[],[],[],[],[],[]];

  semsOChecked: boolean[][] = [[],[],[],[],[],[],[],[],[]];
  semsIChecked: boolean[][] = [[],[],[],[],[],[],[],[],[]];

  chosen: Ispit[] = [];

  first: boolean = false;
  second: boolean = false;
  third: boolean = false;
  fourth: boolean = false;

  numChosen: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];


  async ngOnInit() {
    this.student = JSON.parse(localStorage.getItem('student'));
    switch(this.student.upisana_godina) {
      case 1:
        this.first = true;
        break;
      case 2:
        this.second = true;
        break;
      case 3:
        this.third = true;
        break;
      case 4:
        this.fourth = true;
    }
    await this.loadCourses();
    await this.loadStudentExamsInfo();
    console.log(this.chosen);
  }

  async loadCourses() {
    this.examsService.getAllCourses().subscribe((courses: Kurs[]) => {
      for(let i = 0; i < courses.length; i++) {
        if(courses[i].izborni) {
          this.semsI[courses[i].semestar].push(courses[i]);
        }
        else {
          this.semsO[courses[i].semestar].push(courses[i]);
        }
      }
    });
  }

  setCheckedTrue(exam: Ispit, exams: Kurs[], checked: boolean[]) {
    for(let j = 0; j < exams.length; j++) {
      if(exams[j].sifra == exam.sifra) {
        checked[j] = true;
        this.chosen.push(exam);
        break;
      }
    }
  }

  async loadStudentExamsInfo() {
    this.examsService.getStudentExamsInfo(this.student.indeks).subscribe((info: StudentIspitInfo) => {
      this.studentExamsInfo = info;
      for(let i = 0; i < info.izabrani_predmeti.length; i++) {
        let sem = info.izabrani_predmeti[i].semestar;
        if(info.izabrani_predmeti[i].izborni) {
          this.setCheckedTrue(info.izabrani_predmeti[i], this.semsI[sem], this.semsIChecked[sem]);
          this.numChosen[sem]++;
        }
        else {
          this.setCheckedTrue(info.izabrani_predmeti[i], this.semsO[sem], this.semsOChecked[sem]);
        }
      }
    });
  }

  chooseCourses() {
    this.chosen = [];
    let sem;
    let course: Kurs;
    let price = 0;
    if(this.first) {
      sem = 1;
      for(let i = 0; i < this.semsOChecked[sem].length; i++) {
        if(this.semsOChecked[sem][i]) {
          course = this.semsO[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      for(let i = 0; i < this.semsIChecked[sem].length; i++) {
        if(this.semsIChecked[sem][i]) {
          course = this.semsI[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      sem = 2;
      for(let i = 0; i < this.semsOChecked[sem].length; i++) {
        if(this.semsOChecked[sem][i]) {
          course = this.semsO[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      for(let i = 0; i < this.semsIChecked[sem].length; i++) {
        if(this.semsIChecked[sem][i]) {
          course = this.semsI[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
    }
    else if(this.second) {
      sem = 3;
      for(let i = 0; i < this.semsOChecked[sem].length; i++) {
        if(this.semsOChecked[sem][i]) {
          course = this.semsO[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      for(let i = 0; i < this.semsIChecked[sem].length; i++) {
        if(this.semsIChecked[sem][i]) {
          course = this.semsI[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      sem = 4;
      for(let i = 0; i < this.semsOChecked[sem].length; i++) {
        if(this.semsOChecked[sem][i]) {
          course = this.semsO[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      for(let i = 0; i < this.semsIChecked[sem].length; i++) {
        if(this.semsIChecked[sem][i]) {
          course = this.semsI[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
    }
    else if(this.third) {
      sem = 5;
      for(let i = 0; i < this.semsOChecked[sem].length; i++) {
        if(this.semsOChecked[sem][i]) {
          course = this.semsO[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      for(let i = 0; i < this.semsIChecked[sem].length; i++) {
        if(this.semsIChecked[sem][i]) {
          course = this.semsI[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      sem = 6;
      for(let i = 0; i < this.semsOChecked[sem].length; i++) {
        if(this.semsOChecked[sem][i]) {
          course = this.semsO[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      for(let i = 0; i < this.semsIChecked[sem].length; i++) {
        if(this.semsIChecked[sem][i]) {
          course = this.semsI[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
    }
    else {
      sem = 7;
      for(let i = 0; i < this.semsOChecked[sem].length; i++) {
        if(this.semsOChecked[sem][i]) {
          course = this.semsO[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      for(let i = 0; i < this.semsIChecked[sem].length; i++) {
        if(this.semsIChecked[sem][i]) {
          course = this.semsI[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      sem = 8;
      for(let i = 0; i < this.semsOChecked[sem].length; i++) {
        if(this.semsOChecked[sem][i]) {
          course = this.semsO[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
      for(let i = 0; i < this.semsIChecked[sem].length; i++) {
        if(this.semsIChecked[sem][i]) {
          course = this.semsI[sem][i];
          let ispit: Ispit = new Ispit(course.sifra, 0, course.semestar, course.izborni, 0, '', '', '');
          this.chosen.push(ispit);
          price += this.espbPrice * course.espb;
        }
      }
    }
    if(this.student.budzet) price = 0; // budzet 
    this.examsService.chooseCoursesForStudent(this.student.indeks, this.chosen, price).subscribe((json) => {
      this.router.navigate(['/chosencourses']);
    })
  }

  chooseI(event, sem: number, index: number) {
    if(this.semsIChecked[sem][index]) {
      if(this.numChosen[sem] == MAX_SEM[sem]) {
        this.semsIChecked[sem][index] = false;
        event.target.checked = false;
      }
      else {
        this.numChosen[sem]++;
      }
    }
    else {
      this.numChosen[sem]--;
    }
  }

}
