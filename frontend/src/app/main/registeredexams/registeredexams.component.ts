import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../exams.service';
import { Ispit } from '../models/ispit';
import { IspitInfo } from '../models/ispit_info';
import { Kurs } from '../models/kurs';

@Component({
  selector: 'app-registeredexams',
  templateUrl: './registeredexams.component.html',
  styleUrls: ['./registeredexams.component.css']
})
export class RegisteredexamsComponent implements OnInit {

  constructor(private examsService: ExamsService) { }

  registered: IspitInfo[] = [];
  courses: Kurs[] = [];
  index: string = '';

  async ngOnInit() {
    this.index = JSON.parse(localStorage.getItem('student')).indeks;
    await this.loadCourses();
    this.examsService.getRegisteredExamsForStudent(this.index).subscribe((exams: Ispit[]) => {
      for(let i = 0; i < exams.length; i++) {
        let currCourse = this.courses.find(obj => {return obj.sifra == exams[i].sifra});
        this.registered.push(new IspitInfo(exams[i].sifra, currCourse.naziv, currCourse.izborni, exams[i].ocena, exams[i].semestar, currCourse.espb, exams[i].rok, exams[i].datum_polaganja, exams[i].potpisao));
      }
    });
  }

  async loadCourses() {
    this.examsService.getAllCourses().subscribe((courses: Kurs[]) => {
      this.courses = courses;
    });
  }

}
