import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Catagory } from 'src/app/models/catagory';
import { SearchService } from 'src/app/services/search.service';
import { ProductApiService } from 'src/app/services/product-api.service';
import { CatagoryApiService } from 'src/app/services/catagory-api.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  products: Product[] = [];
  catagories: Catagory[] = [];
  numOfCartItems: number = 0;
  inputVal: string;
  isLoggedIn:boolean = false;
  @Input() totalAddedQuantity: number;

  constructor(
      private router:Router,
      private searchService: SearchService,
      private productApi: ProductApiService,
      private catagoryApi: CatagoryApiService,
      private cartApi: CartService,
      private auth:AuthorizationService
  ) { }

  ngOnInit(): void {
      this.productApi.getAllProducts().subscribe( (products)=>{
        this.products = products.data;
        
      } )
      this.catagoryApi.getCatagories().subscribe( (cats)=>{
        this.catagories = cats.data;
     } )

     this.cartApi.getCartProducts().subscribe({
        next: (carts: any) => {
            console.log("Here number of cart items: " , carts.length);
            this.numOfCartItems = carts.length;
        },
        error: (error: any) => { }
     })
  
  }

  onLogout(){
     this.auth.deleteToken();
     localStorage.clear();
     this.isLoggedIn = false;
     this.router.navigate(['/']);
  }

  onLogin(){
    this.router.navigate(['/login']); 
   
  }


  reloadComponent() { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/display']);
  }


  onSearch(){
   
    let searchedProducts:Product[] = [];

     //searchItem first lettr uppercase, rest are lowercase
    let seachItem:string = this.inputVal.charAt(0).toUpperCase() + this.inputVal.slice(1).toLowerCase();
  
    //catagory wise search logic if applicable
    for(let cat of this.catagories){
       console.log("Inside cat");
        if( cat.name.includes(seachItem)){
            for(let pr of this.products){
               if(pr.category == cat.name)searchedProducts.push(pr);
            }
        }
    }

    //product name wise search logic if applicable
    for(let pr of this.products){
      console.log("Inside pr");
      if(pr.name.includes(seachItem) && !searchedProducts.includes(pr)){
        searchedProducts.push(pr);
      }
    }

  


    this.searchService.setProducts(searchedProducts);
    if( this.router.url == '/display')this.reloadComponent();
    this.router.navigate(['display']);
  }

}
