import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

import { LoggerUser } from '../models/loggerUser';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private apiUrl = 'http://localhost:3030/users';
  private loginUrl = 'http://127.0.0.1:8000/api/account/login/';
 
 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUser(userId: any):Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, httpOptions);
  }

  logUser(credentials:LoggerUser):Observable<any>{
    return this.http.post<any>(this.loginUrl,  credentials, httpOptions);
  }
}