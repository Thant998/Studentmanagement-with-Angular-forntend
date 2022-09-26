import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Course } from './models/Course';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private baseURL = "http://localhost:8080/api/v1/course";
  constructor(private httpClient: HttpClient) { }

  createCourse(course: Course): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, course);
  }

  getCourseByName(name: String | undefined): Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseURL}/${name}`);
  }

  getCourseList(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.baseURL}`);
  }
  
}