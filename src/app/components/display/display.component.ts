import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/cartProduct';
import { Product } from 'src/app/models/product';
import { SearchService } from 'src/app/services/search.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  products: Product[];
  cartProducts: CartProduct[];
  totalAddedQuanty:number = 0;

  constructor(
      private router:Router,
      private searchService:SearchService,
      private cartService: CartService,
      private auth: AuthorizationService
  ) { }

  ngOnInit(): void {
      this.products = this.searchService.getProducts();

      // this.cartService.getCartProducts().subscribe(  (cartProducts)=>{
      //   this.cartService.getCartProducts().subscribe(  (res)=>{
      //        this.cartProducts = res.data;
      //        for( let cp of this.cartProducts){
      //            if( cp.userID == this.auth.getUserPayload().sub){
      //               this.totalAddedQuanty += cp.quantity;
      //            }
      //        }    
      //   })
      // })
     
  }

  addAddedQuantity(){
    this.totalAddedQuanty++;
  }

}
