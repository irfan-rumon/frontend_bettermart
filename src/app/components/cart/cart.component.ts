import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { User } from 'src/app/models/user';
import { CartItem } from 'src/app/models/cartItem';
import { SharedService } from 'src/app/services/shared.service';



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
              private orderApi: OrderService,
              private sharedService: SharedService
            ) { }

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

  placeOrder() {
    // Prepare the request body in the specified format
    const orderRequest = {
        items: this.cartProducts.map(cartItem => ({
            product: cartItem.product,
            quantity: cartItem.quantity
        }))
    };

    // Log the request body for debugging
    console.log("Order placed with request body:", JSON.stringify(orderRequest));

    this.orderApi.placeOrder(orderRequest).subscribe({
        next: (carts: any) => {
          this.cartApi.clearCarts().subscribe({
            next: (response:any)=>{ this.cartProducts = []; this.sharedService.updateCartItemCount(0); },
            error: (error:any)=>{}
          })
          this.cartProducts = [];
          this.router.navigate(['/myorder'])
        },
        error: (error: any) => { }
    })
}


  clearCartItem(cart: CartItem) {
    console.log("To be deleted cart: ", cart);

    // Find the index of the item to be removed
    const index = this.cartProducts.findIndex(item => item.id === cart.id);

    if (index !== -1) {
        // Update grand total by subtracting the total price of the removed item
        this.grandTotal -= this.cartProducts[index].total_price;

        // Remove the item from the array
        this.cartProducts.splice(index, 1);
    }
}


}