import { FormGroup } from '@angular/forms';
export const PasswordChecker = (
  controlName: string,
  compareControlName: string
) => {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls[controlName];
    const confirmPassword = formGroup.controls[compareControlName];
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mustmatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  };
};
