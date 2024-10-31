import { Component, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';
import { Router } from '@angular/router';
import { LoggerUser } from 'src/app/models/loggerUser';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CustomerApiService } from 'src/app/services/customer-api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoggerUser = {} as LoggerUser;
  customers: any[];
  failedLogin: boolean = false;
  isDisabled: boolean = false;

  constructor(
    private userApi: UserApiService,
    private router: Router,
    private customerApi: CustomerApiService,
    private auth: AuthorizationService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // Reset error states
    this.failedLogin = false;
    this.isDisabled = false;

    this.userApi.logUser(this.user).subscribe(
      (response) => {
        if (response["access"]) {
          this.failedLogin = false;
          this.auth.setToken(response["access"]);
          this.sharedService.updateLoginStatus( true );
          this.router.navigate(['/']); // Redirect upon successful login
        } else {
          this.failedLogin = true; // Display 'wrong credentials' message
        }
      },
      (err) => {
        this.failedLogin = true; // Display 'wrong credentials' message on error
        console.log("Login Failed");
      }
    );

    if (this.isDisabled) {
      this.auth.deleteToken();
    }
  }
}
