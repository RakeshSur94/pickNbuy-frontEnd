import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchComponentt } from './components/search/search.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessComponent } from './components/success/success.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  
  {path:'products/:id',component:ProductDetailsComponent},
  {path:'search/:name',component:ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path:'search', component:SearchComponentt},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'cart',component:CartComponent},
  {path: 'checkout',component:CheckoutComponent},
  {path:'success',component:SuccessComponent},
  
  
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
  
];
