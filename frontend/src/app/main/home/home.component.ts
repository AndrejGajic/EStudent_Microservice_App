import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service'
import { Obavestenje } from '../models/obavestenje';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private mainService: MainService) { }

  svaObavestenja: Obavestenje[] = [];
  poslednjaObavestenja: Obavestenje[] = [];
  currDate: Date;
  oneDay: number;

  ngOnInit(): void {
    this.currDate = new Date();
    this.oneDay = 24*60*60*1000;
    this.loadInfos();
  }

  lessThanMonth(info: Obavestenje) {
    let temp = info.datum_od.split('.');
    info.dan = Number(temp[0]);
    info.mesec = Number(temp[1]);
    info.godina = Number(temp[2]);
    let date = new Date(info.godina, info.mesec - 1, info.dan);
    let dayDifference = Math.round(Math.abs((+this.currDate - +date) / this.oneDay));
    return dayDifference <= 30;
  }

  loadInfos() {
    this.mainService.loadAllInfos().subscribe((infos: Obavestenje[]) => {
      let day = this.currDate.getDate();
      let month = this.currDate.getMonth() + 1;
      let year = this.currDate.getFullYear();
      for(let i = 0; i < infos.length; i++) {
        if(this.lessThanMonth(infos[i])) {
          this.poslednjaObavestenja.push(infos[i]);
        }
      }
      this.poslednjaObavestenja.sort((a: Obavestenje, b: Obavestenje) => 
        new Date(b.godina, b.mesec, b.dan).getTime() - new Date(a.godina, a.mesec, a.dan).getTime());
    });
  }

}
