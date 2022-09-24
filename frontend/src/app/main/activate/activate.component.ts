import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit(): void {
    this.index = JSON.parse(localStorage.getItem('student')).indeks;
  }

  code: string = '';
  errorMessage: string = '';
  index: string = '';

  activate() {
    this.errorMessage = '';
    if(this.code == '') {
      this.errorMessage = 'Морате унети код за активацију!';
    }
    else {
      this.mainService.activate(this.index, this.code).subscribe((json) => {
        let message = json['message'];
        if(message != 'OK') {
          this.errorMessage = message;
        }
        else {
          this.router.navigate(['/home']);
        }
      });
    }
  }

}
