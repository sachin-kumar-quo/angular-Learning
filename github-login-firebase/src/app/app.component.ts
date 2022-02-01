import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService) {
    authService.getUser().subscribe({
      next: (user) => {
        console.log(user);
      },
      error: () => {
        console.log('error occured');
      },
    });
  }
  title = 'github-login-firebase';
}
