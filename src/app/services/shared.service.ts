// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private cartItemCountSource = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSource.asObservable();

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSource.asObservable();

  private productsSource = new BehaviorSubject<any[]>([]); 
  products$ = this.productsSource.asObservable();

  constructor(
    private cartApi: CartService,
    private productApi: ProductApiService 
  ) {
    this.initializeCartItemCount();
    this.initializeLoginStatus();
    this.initializeProducts(); 
  }

  private initializeCartItemCount() {
    this.cartApi.getCartProducts().subscribe({
      next: (carts: any) => {
        const count = carts.length;
        this.cartItemCountSource.next(count);
      },
      error: (error) => {
        console.error('Error fetching cart count:', error);
      }
    });
  }

  private initializeLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedInSource.next(!!token);
  }

  // Fetch the initial list of products from API
  private initializeProducts() {
    this.productApi.getAllProducts().subscribe({
      next: (products: any[]) => {
        this.productsSource.next(products); // Set initial products from API response
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  updateCartItemCount(count: number) {
    this.cartItemCountSource.next(count);
  }

  updateLoginStatus(isLoggedIn: boolean) {
    this.isLoggedInSource.next(isLoggedIn);
  }

  updateProducts(products: any[]) {
    this.productsSource.next(products);
  }
}
