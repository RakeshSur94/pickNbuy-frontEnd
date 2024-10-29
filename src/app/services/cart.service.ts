import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../common/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: Cart[] = [];
  cartItemsSubject;
  cartCountSubject;
  count: number = 0;
  constructor() {
    this.cartItemsSubject = new BehaviorSubject<any[]>([]);
    this.cartCountSubject = new BehaviorSubject(0);
  }
  addItem(item: Cart) {
    const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      // Item exists, increase quantity
      this.cartItems[existingItemIndex].quantity++; // Increment quantity
    } else {
      // Item does not exist, add it with quantity 1
      this.cartItems.push({...item, quantity: 1});
    }
   // this.cartItems.push(item);
    this.count++;
    this.cartCountSubject.next(this.count);
    this.cartItemsSubject.next([...this.cartItems]);
  }
  decreaseItem(item: Cart) {
    const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
      // If item already exists, increment the quantity
      this.cartItems[existingItemIndex].quantity--;
    } else{
      this.removeItem(item);
      // If item doesn't exist, add it with quantity of 1
      //this.cartItems.push({ ...item, quantity: 1 });
    }
    




    this.count = Math.max(0, this.count - 1); // Decrease count but not below 0
    this.cartCountSubject.next(this.count);
    this.cartItemsSubject.next([...this.cartItems]);
  }
  removeItem(i:any) {
    this.cartItems.splice(i, 1);
    this.count--;
    this.cartCountSubject.next(this.count);
    this.cartItemsSubject.next([...this.cartItems]);

  }
  getCount() {
    return this.cartCountSubject.getValue();
  }
  getItems() {
    return this.cartItemsSubject.getValue();
  }
  clearCart() {
    this.cartItemsSubject.next([]);
    this.cartCountSubject.next(0);
  }
}
