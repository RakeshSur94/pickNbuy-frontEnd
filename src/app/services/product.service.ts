import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = ' http://localhost:8000/api/product';

  constructor(private httpClient:HttpClient) { }


  getMasterProduct(theProductId:number): Observable<Product>{
    const productUrl = `${this.API_URL}/${theProductId}`;
   return this.httpClient.get<Product>(productUrl);
  }

  searchProducts(name:string): Observable<Product[]>{
    const url = `${this.API_URL}/search/findByNameContaining?name=${name}`;
   return this.httpClient.get<GetResponse>(url).pipe(map(response=> response._embedded.products));

  
  }
  getByCategoryId(theCategoryId:number): Observable<Product[]>{
    const url = `${this.API_URL}/search/findByCategoriesId?id=${theCategoryId}`;
   return this.httpClient.get<GetResponse>(url)
   .pipe(map(response=> response._embedded.products));
  }

  getProducts(): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.API_URL)
    .pipe(map(response=> response._embedded.products));

  }
}

interface GetResponse{
  _embedded: {
    products: Product[];
  }
}
