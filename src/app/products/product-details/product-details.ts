import { Component, input } from '@angular/core';
import { Product } from '../../types/product';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

  product = input<Product>();

}
