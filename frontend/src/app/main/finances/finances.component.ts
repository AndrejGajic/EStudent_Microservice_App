import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  creditCardPay() {
    this.router.navigate(['/cardpay']);
  }

  seeTransactions() {
    this.router.navigate(['/transactions']);
  }

}
