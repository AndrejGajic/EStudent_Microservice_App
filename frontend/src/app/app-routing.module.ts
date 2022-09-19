import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './main/courses/courses.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { MeasuresComponent } from './main/measures/measures.component';
import { OldinfosComponent } from './main/oldinfos/oldinfos.component';
import { PassedexamsComponent } from './main/passedexams/passedexams.component';
import { RegisteredexamsComponent } from './main/registeredexams/registeredexams.component';
import { RegisterexamsComponent } from './main/registerexams/registerexams.component';
import { StudentComponent } from './main/student/student.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'oldinfos', component: OldinfosComponent},
  {path: 'student', component: StudentComponent},
  {path: 'measures', component: MeasuresComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'passedexams', component: PassedexamsComponent},
  {path: 'registerexams', component: RegisterexamsComponent},
  {path: 'registeredexams', component: RegisteredexamsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
