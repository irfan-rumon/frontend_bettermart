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
  showModal: boolean = false;

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

     let userInfo: any = {
        full_name: this.user.fullName,
        email: this.user.email,
        phone_number: this.user.phone,
        password: this.user.password,
        password2: this.user.passConfirm,
        street_address: this.user.street_address,
        city: this.user.city,
        state: this.user.state,
        postal_code: this.user.postal_code,
        country: this.user.country
     }
     console.log(this.user);
     this.userApi.addUser(userInfo).subscribe(
      (newUser) => {
        this.showModal = true;
      },
      (error) => {
        console.error('Error adding user', error);
        // Handle error as needed, maybe show a message to the user
      }
    );
     
   

  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/login']); // Navigate to login after closing the modal
  }


}
