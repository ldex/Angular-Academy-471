import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Product } from '../types/product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiService = inject(ApiService);
  private products = signal<Product[]>([]);
  private loading = signal(false);
  isLoading = this.loading.asReadonly();
  private error = signal<string | undefined>(undefined);
  errorMessage = this.error.asReadonly();

  private loadProducts() {
    this.loading.set(true);
    this.apiService.loadProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: (err) => {
        this.handleError(err, 'Failed to load products.');
      }
    });
  }

  getProducts() {
    this.loadProducts();
    return this.products.asReadonly();
  }


  private handleError(httpError: HttpErrorResponse, userMessage: string) {
    this.loading.set(false)
    let logMessage: string;
    if (httpError.error instanceof ErrorEvent) {
      logMessage = 'An error occurred:' + httpError.error.message;
    } else {
      logMessage = `Backend returned code ${httpError.status}, body was: ${httpError.error}`;
    }
    console.error(logMessage);
    this.error.set(userMessage);

	  //setTimeout(() => this.error.set(undefined), 3000); // Clear after 3 seconds
  }

}
