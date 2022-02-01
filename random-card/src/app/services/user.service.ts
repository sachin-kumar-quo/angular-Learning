import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private url: string = 'https://randomuser.me/api';

  getUser = () => {
    return this.http.get(this.url);
  };
  changeUser = () => {
    return this.http.get(this.url);
  };
}
