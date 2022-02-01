import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    authService.getUser().subscribe({
      error: () => {
        this.toastrService.error('Please login to continue.');
        this.router.navigate(['/signin']);
      },
      complete: () => {
        this.toastrService.success('Welcome back!');
      },
      next: (user) => {
        this.email = user?.email;
      },
    });
  }
  email: string | null | undefined = null;
  ngOnInit(): void {}

  handleSignOut = async () => {
    try {
      console.log('logged out');
      const result = this.authService.signOut();
      this.router.navigate(['/', 'signin']);
      this.email = null;
      this.toastrService.success('You have signed out successfully.');
      this.toastrService.info('Login again to continue.');
    } catch (error: any) {
      this.toastrService.error(error.message);
    }
  };
}
