// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // BehaviorSubject to store the cart item count, initially undefined
  private cartItemCountSource = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSource.asObservable();

  // BehaviorSubject to store login status, initially false
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSource.asObservable();

  constructor(private cartApi: CartService) {
    this.initializeCartItemCount();
    this.initializeLoginStatus();
  }

  // Method to fetch initial count from the API
  private initializeCartItemCount() {
    this.cartApi.getCartProducts().subscribe({
      next: (carts: any) => {
        const count = carts.length;
        this.cartItemCountSource.next(count); // Set the initial count from API response
      },
      error: (error) => {
        console.error('Error fetching cart count:', error);
      }
    });
  }

  // Initialize the login status based on token presence in localStorage
  private initializeLoginStatus() {
    const token = localStorage.getItem('token'); // Adjust 'token' key if named differently
    this.isLoggedInSource.next(!!token); // Set true if token exists, else false
  }

  // Method to update the cart item count manually (e.g., on add/remove actions)
  updateCartItemCount(count: number) {
    this.cartItemCountSource.next(count);
  }

  // Method to manually update login status (e.g., on login/logout)
  updateLoginStatus(isLoggedIn: boolean) {
    this.isLoggedInSource.next(isLoggedIn);
  }
}
