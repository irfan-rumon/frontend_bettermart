import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private apiUrl =  'http://127.0.0.1:8000/api/store/products/';
 

  constructor(private http: HttpClient) {}


  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProductsByName(prod: string): Observable<any> {
    const url = `${this.apiUrl}?name=${prod}`; 
    return this.http.get<any>(url);
}

  getTrendingProducts(): Observable<any> {
    const url = `${this.apiUrl}?is_trending=1`;
    return this.http.get<any>(url, httpOptions);
  }

  getProduct(prId: any): Observable<any> {
    const url = `${this.apiUrl}/${prId}`;
    return this.http.get<any>(url);
  }

  addProduct(pr: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pr, httpOptions);
  }

  editProduct( id:any, data:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data, httpOptions);
  }

  deleteProduct(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
