import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { OrderProduct } from 'src/app/models/orderProduct';
import { Order } from 'src/app/models/order';
import { OrderApiService } from 'src/app/services/order-api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderProducts: any[] = [];
  shipping:number = 3;
  total: number = 0;
  grandTotal:number = 3;
  totalAddedQuanty:number = 0;
  orders: Order[] = [];
  cartProducts: any[] = [];
  delivaryCost: number = 5;
 

  constructor(private router:Router, 
              private orderApi: OrderService,
              private auth: AuthorizationService
             ) { }

  ngOnInit(): void {
       this.orderApi.getOrderItems().subscribe( (orders)=>{
          for(let order of orders){
              console.log("Here order is: ", order);
              let orderItem: Order = {
                 id: order.id,
                 total: Number(order.total_amount) + this.delivaryCost,
                 status: order.status,
                 createdAt: order.created_at
              }
              this.orders.push( orderItem );
          }
       })
  }
   


      
}
     

