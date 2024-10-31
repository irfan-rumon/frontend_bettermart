import { Component, OnInit } from '@angular/core';
import { CatagoryApiService } from 'src/app/services/catagory-api.service';
import { Router } from '@angular/router';
import { Catagory } from 'src/app/models/catagory';
import { Product } from 'src/app/models/product';
import { ProductApiService } from 'src/app/services/product-api.service';
import { SearchService } from 'src/app/services/search.service';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/app/models/cartProduct';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  catagories: Catagory[] = [];
  products: Product[] = [];
  trendingProducts: Product[] = [];
  totalAddedQuanty:number = 0;
  cartProducts:CartProduct[];
 
  
  constructor(private router: Router,
              private catagoryApi:CatagoryApiService,
              private productApi: ProductApiService,
              private searchService: SearchService,
              private cartService: CartService,
              private auth: AuthorizationService,
              private sharedService: SharedService
    ) { }

  ngOnInit(): void {
    this.catagoryApi.getCatagories().subscribe(  (catagories)=>{
       console.log("Here categories are: ", catagories);
       this.catagories = catagories;
    } )
    this.productApi.getTrendingProducts().subscribe( (trendingProduct)=>{
         this.trendingProducts = trendingProduct;
        
    } )
    
      // Subscribe to searched
      this.sharedService.products$.subscribe(
        (products) => {
          this.products = products;
        }
      );

  
  }


  addAddedQuantity(product: Product){
    console.log("Cart added", product);
    this.totalAddedQuanty++;
  }

  onCatClick(cat: Catagory){
    let  searchedProducts: Product[] = [];
    for (let pr of this.products){
       if( pr.category == cat.name){
          searchedProducts.push(pr);
       }
    }
    this.searchService.setProducts(searchedProducts);
    console.log( this.searchService.getProducts()  );
    this.router.navigate(['/display']);
  }

}
