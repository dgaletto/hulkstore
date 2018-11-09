import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productMock: Product[] = [
    { 'name': 'T-Shirt - Wolverine', 'quantity':  10, 'price': 10.5, 'id': '1' },
    { 'name': 'Cup - Superman', 'quantity':  0, 'price': 8, 'id': '2' },
    { 'name': 'Pillow - Spiderman', 'quantity':  23, 'price': 15, 'id': '3' },
  ];

  constructor() { }

  getAll(): Observable<Product[]> {
    return of(this.productMock);
  }

  getById(id: string): Observable<Product> {
    return of(this.productMock.find(product => product.id === id));
  }

  add(product: Product): Observable<Product> {
    product.id = this.productMock.length + 1 + '';
    this.productMock.push(product);

    return of(product);
  }

  update(product: Product): Observable<Product> {
    const index = this.productMock.findIndex(prod => prod.id === product.id);
    this.productMock[index] = product;

    return of(product);
  }

}
