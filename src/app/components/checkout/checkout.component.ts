declare var Razorpay: any;
import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../common/cart';
import { from } from 'rxjs';
import { validateHeaderName } from 'http';
import { CommonModule } from '@angular/common';
import {  OrderItemDto, PurchaseDto } from '../../common/purchase';
import { PaymentVerificationRequest } from '../../common/PaymentVerificationRequest ';
import { log } from 'console';
import { RazorpayResponse } from '../../common/razorpayResponse';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  public customerForm!:FormGroup;
  totalPrice:number=0;
  count:number = 0;
  cart:Cart[]=[];
  total!: number;

  constructor(private checkOutService:CheckoutService,private router:Router,private activateRoute:ActivatedRoute,private cartService:CartService){
   this.customerForm = new FormGroup({
  customerName: new FormControl('',[Validators.required]),
  email: new FormControl('',Validators.required),
  phoneNumber: new FormControl('',Validators.required),
  city: new FormControl('',Validators.required),
  state: new FormControl('',Validators.required),
  zipcode:  new FormControl('',Validators.required),
  country:  new FormControl('',Validators.required),
 
   })

  }


  ngOnInit(): void {

    // Fetch cart data from CartService
    this.cart = this.cartService.getItems();
    this.calculateTotal();
    
 
    this.cartService
    this.activateRoute.queryParams.subscribe((data)=>{
     
      this.totalPrice = +data['totalPrice']|| 0;
      this.count = +data['count']|| 0;
      this.customerForm.patchValue({ count: this.count });
      console.log('Total Price:', this.totalPrice);
      console.log('Count:', this.count);
      
    })


   
  }
  calculateTotal() {
    this.totalPrice = this.cart.reduce((prev, cur) => prev + (cur.unitPrice * cur.quantity), 0);
 }
 

  onSubmit(){
    if (this.customerForm.valid && this.cart.length > 0) {
      this.cart.forEach(item => {
        console.log(item); // Log each item to check its structure
    });
      // Calculate total quantity and prepare order items
      const orderItems: OrderItemDto[] = this.cart.map((item: Cart) => ({
        imageUrl: item.imageUrl,
        productId: item.id,      // Map Cart `id` to `productId`
        quantity: item.quantity, // Use Cart `quantity`
        unitPrice: item.unitPrice // Use Cart `unitPrice`
      }));
      console.log(orderItems);
      
  
      const purchaseDto: PurchaseDto = {
        customerDto: {
          customerName: this.customerForm.value.customerName,
          email: this.customerForm.value.email,
          phoneNumber: this.customerForm.value.phoneNumber,
          password: '', // Include a password if required; otherwise, you may omit this
        },
        ordersItemsDto: orderItems,
        orderDto: {
          orderTrackingNum: Math.floor(Math.random() * 1000000), // Generate a random tracking number or manage it accordingly
          totalQuantity: this.count, // Calculate total quantity from cart
          totalPrice: this.totalPrice, // Assuming this.totalPrice is calculated from the cart
          orderStatus: 'INITIATED', // Initial status
          dateCreated: new Date(), // Current date
          lastUpdated: new Date() // Current date
        },
        addressDto: {
          houseNumber: this.customerForm.value.houseNumber,
          street: this.customerForm.value.street,
          city: this.customerForm.value.city,
          state: this.customerForm.value.state,
          zipcode: this.customerForm.value.zipcode,
          country: this.customerForm.value.country,
        }
      };
      console.log(purchaseDto);
      
  
  

      // Call the backend API to save customer details and get the payment order
      this.checkOutService.handlePurchageRequest(purchaseDto).subscribe({
        next: (response: any) => {
          // Handle successful response and get the Razorpay order ID
          const orderId = response.orderId; // Assuming orderId is in the response
          if (!orderId) {
            console.error('Order ID is undefined or null');
            return; // Prevent opening Razorpay if orderId is invalid
        }
      
          // Open Razorpay payment page
          const options = {
            key: 'rzp_test_zgaIofTU4GMTe9', // Replace with your Razorpay key
            amount: this.totalPrice * 100, // Amount in paise
            currency: 'INR',
            name: 'ecom_ashok_it',
            description: 'Order Description',
            order_id: orderId, // Use the order ID received from the server
            handler: (response: any) => {
              // Handle the payment success response
              console.log('Razorpay Response:', response);
              this.handlePaymentSuccess(response);
            },
            theme: {
              color: '#FC8019' // Your theme color
            }
          };
      
          const rzp = new Razorpay(options);
          rzp.open();
        },
        error: (error) => {
          // Handle error response
          console.error('Error occurred while saving customer details', error);
        },
        complete: () => {
          console.log('Request completed'); // Optional: Handle completion if needed
        }
      });
    }
  }

  handlePaymentSuccess(razorpayResponse:RazorpayResponse) {
    //Check if the required fields exist
    console.log('Razorpay Response:', razorpayResponse);
   
    
    // You might want to create a payment verification request
    const paymentVerificationRequest: PaymentVerificationRequest = {
      
      orderId: razorpayResponse.razorpay_order_id, // Use the order ID returned from Razorpay
      paymentId: razorpayResponse.razorpay_payment_id, // The payment ID received from Razorpay
      signature: razorpayResponse.razorpay_signature // The signature received from Razorpay
     
      
    };
    //request is not comming here
    console.log('Payment Verification Request:', paymentVerificationRequest);
    

    // Optionally call a service to verify the payment
    this.checkOutService.verifyPayment(paymentVerificationRequest).subscribe({
      next: (verificationResponse: any) => {
        console.log("varification response Is",verificationResponse); 
        
        //clear the cart before goes to success page
        this.clearCartTotal();

         // Redirect to a success page
        this.router.navigate(['/success']);      
        
      },
      error: (error) => {
        console.error('Payment verification failed', error);
        // Optionally navigate to an error page or show a message
      },
      complete: () => {
        console.log('Payment verification completed'); // Optional: handle completion logic
      }
    });
  }
  clearCartTotal() {
    this.cart = []; // Clear cart items
    this.total = 0; // Reset total amount
    this.count = 0; // Reset item count
    this.cartService.clearCart(); // Call the service method to clear the cart
  }
  



}
