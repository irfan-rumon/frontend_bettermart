import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductApiService } from 'src/app/services/product-api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  product: Product = {} as Product;

  constructor(private productApi:ProductApiService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.product);
    this.productApi.addProduct(this.product).subscribe(  ()=>{
      this.router.navigate(['/admin/products']); //subscribe er vitore korle page reload hoy na
    } );
   
  }
}
