import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PurchaseDto } from '../common/purchase';
import { PaymentVerificationRequest } from '../common/PaymentVerificationRequest ';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = 'http://localhost:8001/ecomm';

  constructor(private http:HttpClient) { }

  

  handlePurchageRequest(purchaseDto: PurchaseDto): Observable<any> {
    const url = `${this.baseUrl}/customer`;
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, purchaseDto).pipe(
      map((response: any) => {
        // Ensure the response has an orderId
        return {
            orderId: response.orderId // Adjust according to your actual response structure
        };
    }),
    catchError(error => {
        console.error('Error creating purchase request:', error);
        return throwError(error);
    })
);
    
  }

  // Method to verify payment
  verifyPayment(request: PaymentVerificationRequest): Observable<any> {
    const url = `${this.baseUrl}/verify`;
    return this.http.post<any>(url, request).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling method
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
