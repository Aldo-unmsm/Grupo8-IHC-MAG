import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.API_URI}/users`);
  }

  // getUser(id: string) {
  //   return this.http.get(`${this.API_URI}/users/${id}`);
  // }

  saveUser(user: User) {
    return this.http.post(`${this.API_URI}/users`, user);
  }

  daleteUser(id: string) {
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }

  updateUser(id: string|number, updatedUser: User): Observable<User> {
    return this.http.put(`${this.API_URI}/users/${id}`, updatedUser);
  }

  validateUser(id: string) {
    return this.http.get(`${this.API_URI}/users/${id}`);
  }

  validatePassword(id: string) {
    return this.http.get(`${this.API_URI}/users/login/${id}`);
  }

}
