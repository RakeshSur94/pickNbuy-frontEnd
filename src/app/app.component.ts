import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from './common/product';
import { ProductService } from './services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponentt } from './components/search/search.component';
import { ProductCategoryComponent } from "./components/product-category/product-category.component";
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, CommonModule, ReactiveFormsModule, SearchComponentt, ProductCategoryComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'ecommerce-frontend';


}
