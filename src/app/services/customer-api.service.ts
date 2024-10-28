import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})

export class CustomerApiService {

  private apiUrl = 'http://localhost:3030/customers';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCustomer(customerId: any):Observable<Customer> {
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.get<Customer>(url);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer, httpOptions);
  }

  editCustomer(id: any, data:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data, httpOptions);
  }
}
