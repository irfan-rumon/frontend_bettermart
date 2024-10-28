import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductApiService } from 'src/app/services/product-api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product;
  productID: string; 

  constructor(private productApi:ProductApiService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.productID =  this.route.snapshot.paramMap.get('id')! ;
    this.productApi.getProduct( this.productID ).subscribe( (product)=>{
        this.product = product;  
    } )

  }

  onSubmit(){
      this.productApi.editProduct(this.productID, this.product).subscribe( (updatedPr)=>{
          this.router.navigate(['/admin/products']);
      })
  }

}
