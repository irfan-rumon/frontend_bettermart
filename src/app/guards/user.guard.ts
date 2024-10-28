import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { UserApiService } from '../services/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthorizationService,
               private userApi: UserApiService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
       if( !this.auth.isLoggedIn()  )
       {
         this.router.navigate(['/login']);
         this.auth.deleteToken();
         return false;
       }
       else{
            let isAllowed: boolean = true; 
            let userId:string = this.auth.getUserPayload().sub;
            this.userApi.getUser(userId).subscribe( (userInfo)=>{
              console.log("Ai j dekh user info: ", userInfo);    
              if( userInfo.roll == "admin")
              {
                    this.router.navigate(['/login']);
                    this.auth.deleteToken();
                    isAllowed = false;
              }
            } );
            return isAllowed;
           }
  
        
      
  }
  
}
