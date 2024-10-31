import { Component, OnInit } from '@angular/core';

import { ProductApiService } from 'src/app/services/product-api.service';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { OrderProduct } from 'src/app/models/orderProduct';
import { Card } from 'src/app/models/card';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { OrderApiService } from 'src/app/services/order-api.service';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { LoggerUser } from 'src/app/models/loggerUser';
import { UserApiService } from 'src/app/services/user-api.service';
import { CartItem } from 'src/app/models/cartItem';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  card: Card = {} as Card;
 
  cartProducts: CartItem[] = [];
  total:number = 0;
  shipping:number = 5;
  grandTotal:number = 0;
  totalAddedQuanty:number = 0;
  user: User = {} as User;



  constructor(private router:Router,
              private cartApi: CartService,
              private orderService: OrderService,
              private orderApi: OrderApiService,
              private auth:  AuthorizationService,
              private userApi: UserApiService,
              private productApi: ProductApiService) { }

  ngOnInit(): void {

      this.cartApi.getCartProducts().subscribe({
          next: (carts: any) => {
              for(let cp of carts){
                let cartItem:CartItem = {...cp, unit_price: Number(cp.total_price) / cp.quantity, total_price: Number(cp.total_price) };
                this.cartProducts.push( cartItem );
                this.grandTotal += Number( cp.total_price );
              }
          },
          error: (error: any) => { }
      })

  }

  removeQuantity(cartItem: CartItem){
     for(let i=0; i < this.cartProducts.length; i++){
          if( this.cartProducts[i].id == cartItem.id) {
              if( this.cartProducts[i].quantity - 1 >= 0){
                this.cartProducts[i].quantity -= 1;
                this.cartProducts[i].total_price -= Number(this.cartProducts[i].unit_price);
                this.grandTotal -= Number(this.cartProducts[i].unit_price);
              }
              else this.cartProducts[i].quantity = 0;
          }
     }
  }

  addQuantity(cartItem: CartItem){
    for(let i = 0; i < this.cartProducts.length; i++){
        if(this.cartProducts[i].id === cartItem.id) {
            this.cartProducts[i].quantity += 1;
            this.cartProducts[i].total_price += Number(this.cartProducts[i].unit_price);
            this.grandTotal += Number(this.cartProducts[i].unit_price);
        }
    }
  }

}