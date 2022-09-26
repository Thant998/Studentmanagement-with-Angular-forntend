import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "./models/Student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURL = "http://localhost:8080/api/v1/student";

  constructor(private httpClient: HttpClient) {}

  createStudent(student: Student): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, student);
  }

  getStudentList(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}`);
  }

  getStudentById(id: String): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseURL}/${id}`);
  }

  updateStudent(id: String , student: Student): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, student);
  }
  deleteStudent(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getStudentByIdOrNameOrCourse(id: String, name: String, course:String): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}/${id}/${name}/${course}`);
  }

  exportPDF(){
    return this.httpClient.get<any>(`${this.baseURL}/export/pdf`);
  }

  exportExcel() {
    return this.httpClient.get<any>(`${this.baseURL}/export/excel`);
  }

  exportHTML() {
    return this.httpClient.get<any>(`${this.baseURL}/export/html`);
  }
  
}