import { Injectable } from '@angular/core';
import { Market } from '../models/market';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Market[]> {
    return this.http.get<Market[]>(environment.apiURL + '/markets');
  }

  getById(id: string): Observable<Market> {
    return this.http.get<Market>(environment.apiURL + '/markets/' + id);
  }

  add(market: Market): Observable<Market> {
    market.date = new Date();
    return this.http.post<Market>(environment.apiURL + '/markets/', JSON.stringify(market), this.httpOptions);
  }

  update(market: Market): Observable<Market> {
    return this.http.put<Market>(environment.apiURL + '/markets/' + market.id, JSON.stringify(market), this.httpOptions);
  }
}
