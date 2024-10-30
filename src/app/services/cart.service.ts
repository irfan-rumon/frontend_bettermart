import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CartProduct } from '../models/cartProduct';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://127.0.0.1:8000/api/store/carts/';


  constructor(private http: HttpClient) { }

  getCartProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get specific cart product by product ID
  getCartProductByProductId(productId: any): Observable<any> {
    const params = new HttpParams().set('product', productId.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  editProductQuantityOfCart( id:any, data:any): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put<any>(url, data, httpOptions);
  }

  addCart(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, httpOptions);
  }

}
