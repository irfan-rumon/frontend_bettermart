import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderProduct } from 'src/app/models/orderProduct';
import { OrderApiService } from 'src/app/services/order-api.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  
   orderProducts: OrderProduct[];
   order: Order;
   orderedQuantity: number = 0;
   totalBill: number = 0;
 

  constructor(private orderApi: OrderApiService, private router:Router,
              private orderProductApi: OrderService) { }

  ngOnInit(): void {
     this.orderProductApi.getOrderProducts().subscribe(  (op)=>{
          this.orderProducts = op;
          for(let op of this.orderProducts){
            if( op.userID == Number(localStorage.getItem('user-id'))){
               this.orderedQuantity += +op.quantity;
               this.totalBill += +op.subtotal;
            }
          }
     } )
     
   }
 
}
