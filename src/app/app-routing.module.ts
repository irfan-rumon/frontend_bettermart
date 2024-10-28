import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DisplayComponent } from './components/display/display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
     { path: '', redirectTo: 'home', pathMatch: 'full' }, 
     {path: 'home',  component:  HomePageComponent },
     {path: 'display', component: DisplayComponent, canActivate: [UserGuard]},
     {path: 'cart', component: CartComponent, canActivate: [UserGuard]},
     {path: 'login', component: LoginComponent},
     {path: 'register', component: RegisterComponent},
     {path: 'order-confirmation', component: OrderConfirmationComponent, canActivate: [UserGuard]},
     { path: 'about-us', component: AboutUsComponent },
     { path: 'contacts', component: ContactComponent},
     { path: 'myorder', component: OrderComponent, canActivate: [UserGuard]},
     {
      path: 'admin',  
    
      canActivate: [ AdminGuard ],
      loadChildren: () => import('./modules/admin/admin.module').then( (m)=>m.AdminModule,
      ) 
    },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
