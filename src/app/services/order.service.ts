import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://127.0.0.1:8000/api/store/orders/';

  constructor(private http: HttpClient) { }

  getOrderItems(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  placeOrder(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  
  
}
