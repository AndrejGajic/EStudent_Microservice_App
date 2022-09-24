import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private mainService: MainService) { }

  student: Student = null;
  brojIndeksa: string = '';

  ngOnInit(): void {  
    let index = JSON.parse(localStorage.getItem('student')).indeks;
    this.mainService.getStudent(index).subscribe((student: Student) => {
      this.student = student;
      this.formIndex();
      localStorage.removeItem('student');
      localStorage.setItem('student', JSON.stringify(student));
    })
  }

  loadStudent() {
    
  }

  formIndex() {
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
