import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { OldinfosComponent } from './oldinfos/oldinfos.component';
import { StudentComponent } from './student/student.component';
import { MeasuresComponent } from './measures/measures.component';
import { CoursesComponent } from './courses/courses.component';
import { PassedexamsComponent } from './passedexams/passedexams.component';
import { RegisterexamsComponent } from './registerexams/registerexams.component';
import { RegisteredexamsComponent } from './registeredexams/registeredexams.component';
import { CoursechoosingComponent } from './coursechoosing/coursechoosing.component';
import { ActivateComponent } from './activate/activate.component';
import { ChosencoursesComponent } from './chosencourses/chosencourses.component';
import { FinancesComponent } from './finances/finances.component';
import { SurveysComponent } from './surveys/surveys.component';
import { CardpayComponent } from './cardpay/cardpay.component';
import { TransactionsComponent } from './transactions/transactions.component';






@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SidenavComponent,
    OldinfosComponent,
    StudentComponent,
    MeasuresComponent,
    CoursesComponent,
    PassedexamsComponent,
    RegisterexamsComponent,
    RegisteredexamsComponent,
    CoursechoosingComponent,
    ActivateComponent,
    ChosencoursesComponent,
    FinancesComponent,
    SurveysComponent,
    CardpayComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    RouterModule
  ]
})
export class MainModule { }
