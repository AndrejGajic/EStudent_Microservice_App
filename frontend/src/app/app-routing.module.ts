import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateComponent } from './main/activate/activate.component';
import { CardpayComponent } from './main/cardpay/cardpay.component';
import { ChosencoursesComponent } from './main/chosencourses/chosencourses.component';
import { CoursechoosingComponent } from './main/coursechoosing/coursechoosing.component';
import { CoursesComponent } from './main/courses/courses.component';
import { FinancesComponent } from './main/finances/finances.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { MeasuresComponent } from './main/measures/measures.component';
import { OldinfosComponent } from './main/oldinfos/oldinfos.component';
import { PassedexamsComponent } from './main/passedexams/passedexams.component';
import { RegisteredexamsComponent } from './main/registeredexams/registeredexams.component';
import { RegisterexamsComponent } from './main/registerexams/registerexams.component';
import { StudentComponent } from './main/student/student.component';
import { SurveysComponent } from './main/surveys/surveys.component';
import { TransactionsComponent } from './main/transactions/transactions.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'oldinfos', component: OldinfosComponent},
  {path: 'student', component: StudentComponent},
  {path: 'measures', component: MeasuresComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'passedexams', component: PassedexamsComponent},
  {path: 'registerexams', component: RegisterexamsComponent},
  {path: 'registeredexams', component: RegisteredexamsComponent},
  {path: 'coursechoosing', component: CoursechoosingComponent},
  {path: 'activate', component: ActivateComponent},
  {path: 'chosencourses', component: ChosencoursesComponent},
  {path: 'finances', component: FinancesComponent},
  {path: 'surveys', component: SurveysComponent},
  {path: 'cardpay', component: CardpayComponent},
  {path: 'transactions', component: TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
