import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../exams.service';
import { Ispit } from '../models/ispit';
import { IspitInfo } from '../models/ispit_info';
import { Kurs } from '../models/kurs';

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
    this.examsService.getPassedExamsForStudent(this.index).subscribe((json) => {
      console.log(json);
      this.passed = json['passed'];
      this.totalEspb = json['totalEspb'];
      this.avgMark = json['avgMark'];
    });
  }

}
