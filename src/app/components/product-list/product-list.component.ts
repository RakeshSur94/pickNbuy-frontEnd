import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';
import { Cart } from '../../common/cart';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule,CartComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId!: number;
  searchMode!:boolean;
  total: any;

  constructor(private productService: ProductService,
    private route: ActivatedRoute, private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }
  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('name');
    if(this.searchMode){
      this.getProductsByNameSearch();
    }
    else{
      this.listProductsCategoryById();
    }
  }

  listProductsCategoryById() {
    // Check if the 'id' parameter is present in the route
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
   
  
    if (hasCategoryId) {
      // Get the 'id' from the route and convert it to a number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } 
    
    else{
      this.productService.getProducts().subscribe(data => {
        this.products = data;
      });
      return;
    }
  
    // Fetch products by category ID if a valid ID is present
    this.productService.getByCategoryId(this.currentCategoryId).subscribe(data => {
      this.products = data;
    });
  }
  getProductsByNameSearch(){
    const keyWord:string= this.route.snapshot.paramMap.get('name')!;
    this.productService.searchProducts(keyWord).subscribe(data=>{
      this.products=data;
    })
  }
 
  cartAdd(pro:any){
    console.log('cart call comming')
    this.cartService.addItem(pro);
   
  }

}
