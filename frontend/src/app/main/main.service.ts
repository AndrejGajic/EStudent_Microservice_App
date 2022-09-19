import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  studentsURI = 'http://localhost:3000/students';

  login(data) {
    return this.http.post(`${this.studentsURI}/login`, data);
  } 

  loadMainInfos() {
    return this.http.get(`${this.studentsURI}/getMainInfos`);
  }

  loadAllInfos() {
    return this.http.get(`${this.studentsURI}/getAllInfos`);
  }

  getStudentMeasures(indeks: string) {
    const body = {
      indeks: indeks
    };
    return this.http.post(`${this.studentsURI}/getStudentMeasures`, body);
  }

  getAllCourses() {
    return this.http.get(`${this.studentsURI}/getAllCourses`);
  }

  getPassedExamsForStudent(index: string) {
    const body = {
      index: index
    };
    return this.http.post(`${this.studentsURI}/getPassedExamsForStudent`, body);
  }
}
