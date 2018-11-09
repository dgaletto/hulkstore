import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiURL + '/products');
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(environment.apiURL + '/products/' + id);
  }

  add(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.apiURL + '/products/', JSON.stringify(product), this.httpOptions);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(environment.apiURL + '/products/' + product.id, JSON.stringify(product), this.httpOptions);
  }

}
