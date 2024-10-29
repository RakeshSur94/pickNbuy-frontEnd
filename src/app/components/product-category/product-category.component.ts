import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../services/product-category.service';
import { ProductCategory } from '../../common/product-category';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit {
  category: ProductCategory[] = [];
  currentCategoryId!: number;

  constructor(private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProductCategories();
    })
  }

  listProductCategories(){
    this.productCategoryService.getAllProductByCategory().subscribe(data => {
      this.category = data;
      console.log(this.category)
    })

  }
  }

 
