import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductApiService } from 'src/app/services/product-api.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: any;

  constructor(private productApi:ProductApiService, private router: Router) { }

  ngOnInit(): void {
    this.productApi.getAllProducts().subscribe(  response => {
      this.products = response.data;
    
    } )
  }

  onDelete(pr:Product){
    this.productApi.deleteProduct(pr.id).subscribe(  () => (this.products = this.products.filter((p: { _id: string | undefined; }) => p._id !== pr.id)) );//internal array thekei delete
  }

  onEdit(pr:Product){
    this.router.navigate(['admin/products', pr.id, 'edit']);
  }

  onAdd(){
    this.router.navigate(['admin/products/add']);
  }

}