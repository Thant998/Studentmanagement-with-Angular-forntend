import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080/api/v1/user";

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, user);
  }

  getUserList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  getUserById(id: String): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

  updateUser(id: String | undefined, user: User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }

  deleteUser(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getUserByIdAndName(id: string, name: string):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/${id}/${name}`);
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