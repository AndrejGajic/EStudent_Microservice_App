import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../exams.service';
import { Kurs } from '../models/kurs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private examsService: ExamsService) { }

  ngOnInit(): void {
    this.loadAllCourses();
  }

  prviSem: Kurs[] = [];
  drugiSem: Kurs[] = [];
  treciSem: Kurs[] = [];
  cetvrtiSem: Kurs[] = [];
  petiSem: Kurs[] = [];
  sestiSem: Kurs[] = [];
  sedmiSem: Kurs[] = [];
  osmiSem: Kurs[] = [];

  loadAllCourses() {
    this.examsService.getAllCourses().subscribe((courses: Kurs[]) => {
      for(let i = 0; i < courses.length; i++) {
        switch(courses[i].semestar) {
          case 1: 
            this.prviSem.push(courses[i]);
            break;
          case 2:
            this.drugiSem.push(courses[i]);
            break;
          case 3:
            this.treciSem.push(courses[i]);
            break;
          case 4:
            this.cetvrtiSem.push(courses[i]);
            break;
          case 5:
            this.petiSem.push(courses[i]);
            break;
          case 6:
            this.sestiSem.push(courses[i]);
            break;
          case 7:
            this.sedmiSem.push(courses[i]);
            break;
          case 8:
            this.osmiSem.push(courses[i]);
            break;
        }
      }
    });
  }

}
