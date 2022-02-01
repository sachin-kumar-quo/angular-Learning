import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email: string | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        console.log('User: ', user);
        this.email = user.email;
      },
      error: (error) => {
        this.toastr.error('Unable to fetch user');
        console.log('Error: ', error);
      },
    });
  }

  handleSignOut = async () => {
    try {
      await this.authService.signout();
      this.router.navigateByUrl('/signin');
      this.toastr.info('Logged out successfully');
      this.email = null;
    } catch (error) {
      this.toastr.error('Unable to sign out');
      console.log('Error: ', error);
    }
  };

  ngOnInit(): void {}
}
