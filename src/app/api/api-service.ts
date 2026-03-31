import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';
  private http = inject(HttpClient)

  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(delay(1500));
  }

}
