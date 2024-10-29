import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catagory } from '../models/catagory';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CatagoryApiService {

  private apiUrl = 'http://127.0.0.1:8000/api/store/categories/';

  constructor(private http: HttpClient) { }

  
  getCatagories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
