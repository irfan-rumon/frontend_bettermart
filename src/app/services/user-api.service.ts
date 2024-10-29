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

  private registerUrl = 'http://127.0.0.1:8000/api/account/register/';
  private loginUrl = 'http://127.0.0.1:8000/api/account/login/';
 
 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.registerUrl);
  }

  getUser(userId: any):Observable<User> {
    const url = `${this.registerUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user, httpOptions);
  }

  logUser(credentials:LoggerUser):Observable<any>{
    return this.http.post<any>(this.loginUrl,  credentials, httpOptions);
  }
}