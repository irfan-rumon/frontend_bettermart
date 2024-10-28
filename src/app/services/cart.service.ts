import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private apiUrl = 'http://localhost:3030/cart-products';


  constructor(private http: HttpClient) { }

  getCartProducts(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  addCartProduct(cp: CartProduct):any {
    return this.http.post<any>(this.apiUrl, cp);
  }

  editCartProduct(id: any, cp:any):any {
    console.log(id);
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, cp, httpOptions);
  }

  deleteCartProduct(cp:any):any {
    const url = `${this.apiUrl}/${cp._id}`;
    return this.http.delete<any>(url);
  }

}
