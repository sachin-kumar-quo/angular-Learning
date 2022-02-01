import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit = (form: NgForm) => {
    const { email, password } = form.form.value;
    this.authService
      .signin(email, password)
      .then(() => {
        this.router.navigateByUrl('/');
        this.toastr.success('Signin successful');
      })
      .catch((err) => {
        this.toastr.error('Signin failed');
      });
  };
}
