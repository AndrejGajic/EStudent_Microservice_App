import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../exams.service';
import { Ispit } from '../models/ispit';
import { IspitInfo } from '../models/ispit_info';
import { Kurs } from '../models/kurs';
import { PolozeniIspiti } from '../models/polozeni_ispiti';

@Component({
  selector: 'app-passedexams',
  templateUrl: './passedexams.component.html',
  styleUrls: ['./passedexams.component.css']
})
export class PassedexamsComponent implements OnInit {

  constructor(private examsService: ExamsService) { }

  courses: Kurs[] = [];
  passed: IspitInfo[] = [];
  index: string = '';

  totalEspb: number = 0;
  avgMark: number = 0;

  async ngOnInit() {
    this.index = JSON.parse(localStorage.getItem('student')).indeks;
    await this.loadCourses();
    this.examsService.getPassedExamsForStudent(this.index).subscribe((exams: Ispit[]) => {
      for(let i = 0; i < exams.length; i++) {
        let currCourse = this.courses.find(obj => {return obj.sifra == exams[i].sifra});
        console.log(exams[i].sifra);
        console.log(currCourse);
        this.passed.push(new IspitInfo(exams[i].sifra, currCourse.naziv, currCourse.izborni, exams[i].ocena, currCourse.espb, exams[i].rok, exams[i].datum_polaganja, exams[i].potpisao));
        this.totalEspb += currCourse.espb;
        this.avgMark += exams[i].ocena;
      }
      this.avgMark = Number((this.avgMark / exams.length).toFixed(2));
    });
  }

  async loadCourses() {
    this.examsService.getAllCourses().subscribe((courses: Kurs[]) => {
      this.courses = courses;
    });
  }

}
