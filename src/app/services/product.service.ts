import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = ' http://localhost:8000/api/product';

  constructor(private httpClient:HttpClient) { }

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
