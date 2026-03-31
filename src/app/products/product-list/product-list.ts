import { Component, inject, Signal, signal } from '@angular/core';
import { Product } from '../../types/product';
import { CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';
import { OrderByPipe } from '../orderBy.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [UpperCasePipe, CurrencyPipe, OrderByPipe, SlicePipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export default class ProductList {

  private productService = inject(ProductService);
  private router = inject(Router);

  isLoading = this.productService.isLoading;

  message = this.productService.errorMessage;

  title: Signal<string> = signal('Products');

  pageSize = signal(5);
  start = signal(0);
  end = signal(this.pageSize());
  pageNumber = signal(1);

  changePage(increment: number): void {
    this.start.update((start) => start + increment * this.pageSize());
    this.end.set(this.start() + this.pageSize());
    this.pageNumber.update((pageNumber) => pageNumber + increment);
    this.selectedProduct.set(null);
  }

  selectedProduct = signal<Product | null>(null);

  select(product: Product) {
    this.selectedProduct.set(product);
    this.router.navigate(['/products', product.id]);
  }

  products: Signal<Product[]> = this.productService.getProducts();

}
