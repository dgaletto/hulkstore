import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL + '/users');
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(environment.apiURL + '/users/' + id);
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(environment.apiURL + '/users/', JSON.stringify(user), this.httpOptions);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(environment.apiURL + '/users/' + user.id, JSON.stringify(user), this.httpOptions);
  }


}
