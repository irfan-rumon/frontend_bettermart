import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserApiService } from 'src/app/services/user-api.service';
import { CustomerApiService } from 'src/app/services/customer-api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = {} as User;
  passNotMatched: boolean = false;

  constructor(private router: Router, 
              private customerApi: CustomerApiService, 
              private userApi: UserApiService) { }

  ngOnInit(): void {
  }

  onSubmit(){
     if( this.user.password != this.user.passConfirm)
     {
        this.passNotMatched = true;
       
        return;
     }
     //console.log(this.user);
     this.userApi.addUser(this.user).subscribe(   (newUser)=>{
      if( newUser.roll == 'user'){
        let customer: any = {
            userID: newUser._id,
            name: newUser.fullName,
            email: newUser.email,
            address: newUser.address,
            phone: newUser.phone,
        }
        console.log("Amader noya customer: ", customer);
        this.customerApi.addCustomer( customer ).subscribe(  (res)=>{
            console.log("done");
            alert('Registration Successfull!');
            this.router.navigate(['/login']);
         
        },   (err)=>{
            console.log("customer add hoy nai");
        });
     }

     });
     
   

  }


}
