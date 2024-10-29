import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit{

  orderId!:string;

  constructor(private activateRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((data)=>{
      this.orderId=data['orderId']
      
    })
    console.log("order id is ",this.orderId);
    
  }



}
