import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../common/cart';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products: any[] = [];
  cart: Cart[] = [];
  total: number = 0;
  count: number = 0;

  constructor(private c: CartService,private route:Router) {}

  ngOnInit() {
    // Subscribe to cart items and count once during initialization
    this.c.cartItemsSubject.subscribe((items) => {
      this.cart = items;
      this.calculateTotal();
    });

    this.c.cartCountSubject.subscribe((data) => {
      this.count = data;
    });
  }

  // Delete an item from the cart
  deleteItem(i: number) {
    this.c.removeItem(i);
    this.calculateTotal();
  }

  // Add an item (increase quantity if exists)
  addItem(cart: Cart) {
    this.c.addItem(cart);
    this.calculateTotal();

  }

  // Decrease the quantity of an item
  decreaseQuantity(cartItem: Cart) {
    if (cartItem.quantity > 1) {
      this.c.decreaseItem(cartItem);
    } else {
      // If quantity is 1, you can choose to set it to zero or remove the item
      this.c.removeItem(cartItem);
    }
    this.calculateTotal();
  }

  // Calculate total price considering quantity
  calculateTotal() {
     this.total = this.cart.reduce((prev, cur) => prev + (cur.unitPrice * cur.quantity), 0);
  }
  checkout() {
    this.route.navigate(['/checkout'], {
        queryParams: {
            totalPrice: this.total, // Pass the total price
            count:this.count
        }
    });
}

}
