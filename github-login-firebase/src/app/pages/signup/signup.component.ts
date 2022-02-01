import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit = (f: NgForm) => {
    const { email, password } = f.form.value;
    this.authService
      .signUp(email, password)
      .then((res) => {
        this.router.navigateByUrl('/');
        this.toastr.success('Successfully signed UP');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('unable to signup ');
      });
  };
}
