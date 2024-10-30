import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/cartProduct';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product;
  @Output() onAddCart: EventEmitter<Product> = new EventEmitter();
  cartProducts: any[] = [];




  constructor(private router: Router, private cartService: CartService,
             private auth:AuthorizationService
    ) { }

  ngOnInit(): void {
    
  }

  onAddToCart(product: Product){
              
     
      console.log("Here inside product item, clicked cart item: ", product);
      this.onAddCart.emit(product); // Inform parent component

      this.cartService.getCartProductByProductId(product.id).subscribe({
          next: (cartItem: any) => {
                console.log('Retrieved cart item through product id:', cartItem);
                //add quantity by 1 
                let updatedQuantity:number = cartItem?.quantity + 1;
                console.log("Here updated quantity is: ", updatedQuantity);
                let reqPayload:any = {
                    product: product.id,
                    quantity: updatedQuantity
                }
                 //api call to increase quantity
                this.cartService.editProductQuantityOfCart(cartItem.id, reqPayload).subscribe({
                    next: (res:any) => {},
                    error: (res:any) => {}
                })
               
          },
          error: (error: any) => {
                console.log(error);
                let reqPayload:any = {
                   product: product.id,
                   quantity: 1
                }
                //api call to add cart
                this.cartService.addCart(reqPayload).subscribe({
                    next: (res:any) => {},
                    error: (res:any) => {}
                })
          }
      });

  }

 


}


