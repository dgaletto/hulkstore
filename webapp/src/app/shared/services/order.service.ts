import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private productMock: Product = { 'name': 'T-Shirt - Wolverine', 'quantity':  10, 'price': 10.5, 'id': '1' };
  private userMock: User = { 'firstName': 'Employee 1', 'lastName': 'Employee 1', 'id': '1' };

  private orderMock: Order[] = [
    { 'date': new Date(), 'products': [this.productMock], 'user': this.userMock, 'id': '1' },
    { 'date': new Date(), 'products': [this.productMock], 'user': this.userMock, 'id': '2' },
    { 'date': new Date(), 'products': [this.productMock], 'user': this.userMock, 'id': '3' },
  ];

  constructor() { }

  getAll(): Observable<Order[]> {
    return of(this.orderMock);
  }

  getById(id: string): Observable<Order> {
    return of(this.orderMock.find(order => order.id === id));
  }

  add(order: Order): Observable<Order> {
    order.id = this.orderMock.length + 1 + '';
    order.date = new Date();
    this.orderMock.push(order);

    return of(order);
  }

  update(order: Order): Observable<Order> {
    const index = this.orderMock.findIndex(prod => prod.id === order.id);
    this.orderMock[index] = order;

    return of(order);
  }
}
