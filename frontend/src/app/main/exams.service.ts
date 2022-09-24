import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ispit } from './models/ispit';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private http: HttpClient) { }

  examsURI = 'http://localhost:3001/exams';

  getAllCourses() {
    return this.http.get(`${this.examsURI}/getAllCourses`);
  }

  getPassedExamsForStudent(index: string) {
    const body = {
      index: index
    };
    return this.http.post(`${this.examsURI}/getPassedExamsForStudent`, body);
  }

  getRegisteredExamsForStudent(index: string) {
    const body = {
      index: index
    };
    return this.http.post(`${this.examsURI}/getRegisteredExamsForStudent`, body);
  }

  getStudentExamsInfo(index: string) {
    const body = {
      index: index
    };
    return this.http.post(`${this.examsURI}/getStudentExamsInfo`, body);
  }

  getStudentChosenCourses(index: string) {
    const body = {
      index: index
    };
    return this.http.post(`${this.examsURI}/getStudentChosenCourses`, body);
  }

  chooseCoursesForStudent(index: string, chosen: Ispit[], price: number) {
    const body = {
      index: index,
      chosen: chosen,
      price: price
    };
    return this.http.post(`${this.examsURI}/chooseCoursesForStudent`, body);
  }

  getCurrCourseTimetable() {
    return this.http.get(`${this.examsURI}/getCurrCourseTimetable`);
  }

  getCurrExamsTimetable() {
    return this.http.get(`${this.examsURI}/getCurrExamsTimetable`);
  }

  getExamsThatCanBeRegistered(index: string) {
    const body = {
      index: index
    };
    return this.http.post(`${this.examsURI}/getExamsThatCanBeRegistered`, body);
  }
  
}
