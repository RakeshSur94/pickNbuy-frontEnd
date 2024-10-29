import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  products!:Product;
  constructor(private pService:ProductService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.route.paramMap.subscribe(()=>{
        this.listOfProduct();
      })
  }
  listOfProduct(){
    const theProductId:number = +this.route.snapshot.paramMap.get('id')!;
    console.log(theProductId)
    
      this.pService.getMasterProduct(theProductId).subscribe((data)=>{
        this.products=data;
        console.log(this.products)
      })
    
  }


}
