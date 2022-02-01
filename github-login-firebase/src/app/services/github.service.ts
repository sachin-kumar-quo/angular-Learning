import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getUserDetails = (username: string) => {
    return this.http.get(`https://api.github.com/users/${username}`);
  };

  getRepos = (repoURL: string) => {
    return this.http.get(repoURL);
  };
}
// https://api.github.com/users/sk5072
