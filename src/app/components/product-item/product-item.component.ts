import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/cartProduct';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ObjectUnsubscribedError } from 'rxjs';
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
        
      this.onAddCart.emit(product); //parent componentke inform kora

      this.cartService.getCartProducts().subscribe(  (res)=>{ //always subscriber er vitorei kaj korte hoy noile
                                 // problem kore
        let arr:any[] = res.data;
        for(let cp of arr){
          //  console.log("Whole Object", cp, cp.brand, cp._id);
                if(cp.productID == product._id   && cp.userID == this.auth.getUserPayload().sub){ //already exist,
                 // console.log("EDIT korte ready.....");
                    
                  cp.quantity++;
                    cp.subtotal = +cp.unitPrice  + +cp.subtotal;  
                   // console.log("Edired Object: ", cp);
                    
                    this.cartService.editCartProduct(cp._id, cp).subscribe(); 
                    return; 
                }
      } 

      
      let newCartProduct = {} as any;
     
      newCartProduct.userID = this.auth.getUserPayload().sub; newCartProduct.brand=product.brand;
      newCartProduct.name=product.name;  newCartProduct.imageURL=product.imageURL;
      newCartProduct.unitPrice=product.unitPrice; newCartProduct.quantity=1;
      newCartProduct.subtotal=product.unitPrice;
      newCartProduct.productID = product._id; //! means it not null for sure

      this.cartService.addCartProduct( newCartProduct  ).subscribe();
      this.cartProducts.push(newCartProduct);
  })

  
}



}


