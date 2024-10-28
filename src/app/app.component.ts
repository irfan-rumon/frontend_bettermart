import { Component, Input } from '@angular/core';
import { AuthInterceptor } from './services/auth.interceptor';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   currentUser:User;

   
 

 
}
