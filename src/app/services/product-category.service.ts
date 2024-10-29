import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private httpClient:HttpClient) { }


  getAllProductByCategory(): Observable<ProductCategory[]>{
   return this.httpClient.get<GetResponse>('http://localhost:8000/api/product-category')
   .pipe(map(response=> response._embedded.productCategories))
  }
}
interface GetResponse{
  _embedded: {
    productCategories: ProductCategory[];
  }
}
