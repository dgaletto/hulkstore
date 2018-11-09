import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersMock: User[] = [
    { 'firstName': 'Employee 1', 'lastName': 'Employee 1', 'id': '1' },
    { 'firstName': 'Employee 2', 'lastName': 'Employee 2', 'id': '2' },
    { 'firstName': 'Employee 3', 'lastName': 'Employee 3', 'id': '3' }
  ];

  constructor() { }

  getAll(): Observable<User[]> {
    return of(this.usersMock);
  }

  getById(id: string): Observable<User> {
    return of(this.usersMock.find(user => user.id === id));
  }


}
