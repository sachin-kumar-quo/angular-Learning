import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authService: AngularFireAuth) {}

  signup = (email: string, password: string) => {
    return this.authService.createUserWithEmailAndPassword(email, password);
  };

  signin = (email: string, password: string) => {
    return this.authService.signInWithEmailAndPassword(email, password);
  };

  getUser = () => {
    return this.authService.authState;
  };

  signout = () => {
    this.authService.signOut();
  };
}
