import { Injectable } from '@angular/core';
import { Product } from '../models/product';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  products: Product[];

  constructor() { }

  

  setProducts(products: Product[]){
    this.products = products;
  }

  getProducts(){
    return this.products;
  }

}
