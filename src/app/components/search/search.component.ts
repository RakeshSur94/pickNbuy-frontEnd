import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from "../product-list/product-list.component";
import { AppComponent } from '../../app.component';

import { ActivatedRoute, RouterOutlet,Route, RouterLink, Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';
import { Cart } from '../../common/cart';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule,ProductListComponent,RouterLink,CartComponent,LoginComponent,RouterLink,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponentt implements OnInit{
  
   
  
  products:Product[]=[];
  cart:Cart[]=[];
  total:number = 0;
  count:number = 0;

  constructor(private productService:ProductService,private route:ActivatedRoute,private router:Router, private cartService:CartService){}

  ngOnInit(): void {
   this.cartService.cartItemsSubject.subscribe((i)=>{
    this.cart = i;
    this.calculateTotal();
   })

   this.cartService.cartCountSubject.subscribe((i)=>{
    this.count = i;
   })
   
  }
  getCountOfProduct(){
    this.calculateTotal();
    
  }
  doSearch(value:string) {
   
      this.router.navigateByUrl(`/search/${value}`);
    
  }
  deleteItem(i: number)
  {
    this.cartService.removeItem(i);
    this.calculateTotal()
  }
  calculateTotal()
  {
    this.total = this.cart.reduce(
      (pre, cur) => pre + cur.unitPrice * cur.quantity, // Multiply unit price by quantity
      0
    );
        
        

    
  }
 
 
 
  }

 
  

