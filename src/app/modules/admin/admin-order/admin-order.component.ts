import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderApiService } from 'src/app/services/order-api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  orders: any[] = [];

  constructor(private router:Router, private orderApi:OrderApiService,
              private auth: AuthorizationService) { }

  ngOnInit(): void {
     this.orderApi.getOrders(  ).subscribe( (orders)=>{
         this.orders = orders.data;
     }  )
  }

  changeStatus(order:any){
        let newOrder: Order = {
          userID: order.userID,
          userAddress: order.userAddress,
          userPhone: order.userPhone,
          status: "Delivered",
          totalAddedQuantity: order.totalAddedQuantity,
          grandTotal: order.grandTotal
        }
        this.orderApi.editOrder(order._id, newOrder).subscribe(  (res)=>{
            for(let op of this.orders){
               if( op._id == order._id)
                 if( op.status == "Pending")op.status = "Delivered";
            }
        });
  }

 

 
  }


