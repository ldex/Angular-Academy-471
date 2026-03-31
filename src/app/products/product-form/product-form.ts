import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormOptions, FormRoot, max, maxLength, min, minLength, pattern, required, schema } from '@angular/forms/signals';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-form',
  imports: [FormRoot, FormField],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {

  private productService = inject(ProductService);
  private router = inject(Router);

  error = this.productService.errorMessage;

  protected readonly product = signal<Omit<Product, 'id'>>({
    name: '',
    description: '',
    discontinued: false,
    fixedPrice: false,
    price: 0,
    modifiedDate: new Date(),
    imageUrl: '',
  });

  protected readonly productSchema = schema<Omit<Product, 'id'>>((path) => {
    required(path.name, { message: 'Name is required.'});
    required(path.price, { message: 'Price is required.'});

    minLength(path.name, 3, { message: 'Name must be at least 3 characters long.'});
    maxLength(path.name, 50, { message: 'Name cannot exceed 50 characters.'});
    minLength(path.description, 5, { message: 'Description must be at least 5 characters long.'});
    maxLength(path.description, 500, { message: 'Description cannot exceed 500 characters.'});

    min(path.price, 0, { message: 'Price cannot be negative.'});
    max(path.price, 100000, { message: 'Price cannot exceed 100 000.'});

    pattern(
      path.imageUrl,
      new RegExp(
        '^(https?://[a-zA-Z0-9-.]+.[a-zA-Z]{2,5}(?:/S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+.)(\\?(?:&?[^=&]*=[^=&]*)*)?$'
      ),
      {
        message: 'Invalid image url.',
      }
    );
  });

  protected readonly formOptions: FormOptions<Omit<Product, 'id'>> = {
    submission: {
      action: async (form) => {
        const newProduct = form().value();
        console.log('Product to save:', newProduct);
        await this.productService.createProduct(newProduct);
		    this.router.navigateByUrl('/products');
      }
    }
  };

  protected readonly productForm = form(this.product, this.productSchema, this.formOptions);

}
