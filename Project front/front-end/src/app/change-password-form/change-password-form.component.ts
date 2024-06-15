import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../infrastructure/authentication/auth.service';
import { ChangePasswordRequest } from '../model/change-password-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit{

  changePasswordForm!: FormGroup
  message:string = ''
  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: [ this.passwordMatchValidator, this.passwordStrengthValidator]
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('newPassword');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password && confirmPassword) {
      const match = password.value === confirmPassword.value;
      if (!match) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value)) {
        return { 'passwordStrength': true };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const formValue = this.changePasswordForm.value;

      // Create ChangePasswordRequest object
      const changePasswordRequest: ChangePasswordRequest = {
        userId: this.authService.getUserId(),
        currentPassword: formValue.currentPassword,
        newPassword: formValue.newPassword,
        confirmNewPassword: formValue.confirmPassword
      };

      // Call the AuthService changePassword method
      this.authService.changePassword(changePasswordRequest).subscribe(
        response => {
          this.errorMessage = ''
          this.message = 'Password has been changed successfully!\nYou will be logged out in 4 seconds';
          setTimeout(() => {
            this.authService.logout()
            this.router.navigate(['login']);
          }, 4000);
        },
        error => {
          // Handle error
          console.error('Error changing password', error);
          this.errorMessage = "Incorrect current password!"
        }
      );
    }
  }


}
