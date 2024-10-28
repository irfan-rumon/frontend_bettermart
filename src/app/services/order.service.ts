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

  private apiUrl = 'http://localhost:3030/order-products';

  constructor(private http: HttpClient) { }

  getOrderProducts(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  addOrderProduct(cp: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cp);
  }

  editOrderProduct(id: any, cp:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, cp, httpOptions);
  }

  deleteOrderProduct(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
