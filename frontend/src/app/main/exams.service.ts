import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  
}
