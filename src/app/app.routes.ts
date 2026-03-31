import { Routes } from '@angular/router';
import { Home } from './shared/home';
import { Contact } from './shared/contact';
import { Admin } from './shared/admin';
import { ProductDetails } from './products/product-details/product-details';
import { ProductForm } from './products/product-form/product-form';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'products', loadComponent: () => import('./products/product-list/product-list') },
    { path: 'products/create', component: ProductForm },
    { path: 'products/:id', component: ProductDetails },
    { path: 'contact', component: Contact },
    { path: 'admin', component: Admin },
    { path: '**', component: Error }
];
