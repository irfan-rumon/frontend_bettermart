import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { CatagoryItemComponent } from './components/catagory-item/catagory-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { DisplayComponent } from './components/display/display.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxServicesOptionComponent } from './components/checkbox-services-option/checkbox-services-option.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductItemComponent,
    NavbarComponent,
    SliderComponent,
    CatagoryItemComponent,
    FooterComponent,
    DisplayComponent,
    CheckboxComponent,
    CheckboxServicesOptionComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    OrderComponent,

    EditProductComponent,
    OrderConfirmationComponent,
    AboutUsComponent,
    ContactComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    

  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
