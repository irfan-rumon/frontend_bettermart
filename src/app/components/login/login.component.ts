import { Component, OnInit} from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';
import { Router } from '@angular/router';
import { LoggerUser } from 'src/app/models/loggerUser';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CustomerApiService } from 'src/app/services/customer-api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: LoggerUser = {} as LoggerUser;
  customers: any[];
  failedLogin: boolean = false;;
  isDisabled: boolean = false;
  

  constructor(private userApi: UserApiService, private router:Router,
              private customerApi: CustomerApiService, 
             private auth: AuthorizationService) { }

  ngOnInit(): void {
   
  }

 


  onSubmit(){

    this.isDisabled = false;
    this.user.strategy = "local";
    this.userApi.logUser(this.user).subscribe(   (response)=>{   
               this.auth.setToken(response["accessToken"]);
                this.customerApi.getCustomers().subscribe( (res:any)=>{
                      this.customers = res.data;
                      for(let customer of this.customers){
                          if( customer.email == this.user.email && customer.status == "Disabled"){
                                  this.isDisabled = true;
                                return;
                          }
                      }
                      if(!this.isDisabled){
                                      this.user.strategy = "local";
                                      this.userApi.logUser(this.user).subscribe(   (res)=>{         
                                          this.auth.setToken(res["accessToken"]);
                                          if( res['user'].roll == 'user') this.router.navigate(['/home']);
                                          else if ( res['user'].roll == 'admin') this.router.navigate(['/admin']);
                                        
                                        }, (err) => {
                                          
                                          this.failedLogin = true;
                                          console.log("Login Failed");
                                      } );
                      }
                
                }) 
    }, (err) => {
                                          
      this.failedLogin = true;
      console.log("Login Failed");
  });
    if(this.isDisabled)this.auth.deleteToken();

  }  

}
