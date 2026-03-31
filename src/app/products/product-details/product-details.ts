import { Component, inject, input, OnInit, Signal } from '@angular/core';
import { Product } from '../../types/product';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {

  private productService = inject(ProductService);
  private router = inject(Router);

  id = input.required<number>();

  product: Signal<Product>;

  ngOnInit() {
    this.product = this.productService.getProductById(this.id());
  }

  async deleteProduct() {
    await this.productService.deleteProduct(this.id());
    // Navigate back to the product list
    this.router.navigateByUrl('/products');
  }

}
