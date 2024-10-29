import { Component } from '@angular/core';
import { Product } from '../../common/product';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  product:Product[]=[];
  

}
