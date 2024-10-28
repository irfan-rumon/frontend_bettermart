import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerApiService } from 'src/app/services/customer-api.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class  UserListComponent  implements OnInit {

  customers: any[] = [];

  constructor(private customerApi: CustomerApiService,
              private router:Router) { }

  ngOnInit(): void {
      this.customerApi.getCustomers().subscribe(  (customers:any)=>{
          this.customers = customers.data;
      })
  }

  setDisabled(customer: any){
       customer.status = "Disabled";
       this.customerApi.editCustomer(customer._id, customer).subscribe(  (editedCustomer)=>{
            for(let c of this.customers){
              if( c._id == customer._id){
                 c.status = "Disabled";
                 break;
              }
            }
       })
  }

  setActive(customer: any){
    customer.status = "Active";
    this.customerApi.editCustomer(customer._id, customer).subscribe(  (editedCustomer)=>{
         for(let c of this.customers){
           if( c._id == customer._id){
              c.status = "Active";
              break;
           }
         }
    })
  }

}
