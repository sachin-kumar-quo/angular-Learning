import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChecker } from './custom-validators/password-checker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  title = 'signup-reactive';
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: PasswordChecker('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.signupForm.controls;
  }
  signupForm!: FormGroup;
  submitted: boolean = false;

  onReset(): void {
    this.submitted = false;
    this.signupForm.reset();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    console.table(this.signupForm.value);
    console.table(this.signupForm);
    alert('Success! \n' + JSON.stringify(this.signupForm.value));
  }
}
