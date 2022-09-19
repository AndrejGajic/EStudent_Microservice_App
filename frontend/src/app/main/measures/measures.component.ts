import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { DisciplinskaMera } from '../models/disciplinska_mera';

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.css']
})
export class MeasuresComponent implements OnInit {

  constructor(private mainService: MainService) { }

  indeks: string;
  mere: DisciplinskaMera[] = [];

  ngOnInit(): void {
    this.indeks = JSON.parse(localStorage.getItem('student')).indeks;
    this.mainService.getStudentMeasures(this.indeks).subscribe((measures: DisciplinskaMera[]) => {
      this.mere = measures;
    })
  }

}
