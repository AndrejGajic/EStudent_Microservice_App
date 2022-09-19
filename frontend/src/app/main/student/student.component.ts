import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor() { }

  student: Student = null;
  brojIndeksa: string = '';

  ngOnInit(): void {
    this.student = JSON.parse(localStorage.getItem('student'));
    this.formirajIndeks();
  }

  formirajIndeks() {
    let year = Number(this.student.indeks.substring(2, 4));
    let index = this.student.indeks.substring(4, 8);
    if(year <= 22) {
      this.brojIndeksa += '20' + year;
    }
    else {
      this.brojIndeksa += '19' + year;
    }
    this.brojIndeksa += '/' + index;
  }

}
