import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { Obavestenje } from '../models/obavestenje';
import { Student } from '../models/student';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router) { }

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  student: Student = null;
  glavnaObavestenja: Obavestenje[] = [];

  ngOnInit(): void {
    localStorage.clear();
    this.mainService.loadMainInfos().subscribe((mainInfos: Obavestenje[]) => {
      this.glavnaObavestenja = mainInfos;
    });
  }

  login() {
    if(this.username == '') {
      this.errorMessage = 'Морате унети корисничко име!';
    }
    else if(this.password == '') {
      this.errorMessage = 'Морате унети лозинку!';
    }
    else {
      this.errorMessage = '';
      const data = {
        username: this.username,
        password: this.password
      };
      this.mainService.login(data).subscribe((json) => {
        let message = json['message'];
        if(message != 'OK') {
          this.errorMessage = message;
        }
        else {
         this.student = json['student'];
         localStorage.setItem('student', JSON.stringify(this.student));
         if(this.student.aktiviran) {
            this.router.navigate(['/home']);
         }
         else {
            this.router.navigate(['/activate']);
         }
        }
      })
    }
  }



}
