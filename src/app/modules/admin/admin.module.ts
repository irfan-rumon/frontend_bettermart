import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';




@NgModule({
  declarations: [
    AdminFooterComponent,
    AdminProductsComponent,
    AddProductsComponent,
    AdminNavbarComponent,
    AdminOrderComponent,
    UserListComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
  
})
export class AdminModule { }
