import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../infrastructure/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordRequest } from '../model/reset-password-request.model';
import { TfaCodeVerificationRequest } from '../model/tfaCodeVerificationRequest.model';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit{

  isTfaEnabled:boolean = false
  otpCode!: string
  email!: string
  token!: string
  changePasswordForm!: FormGroup
  errorMessage!: string
  message!: string


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });

    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: [ this.passwordMatchValidator, this.passwordStrengthValidator]
    });

    this.authService.resetPasswordRedirect(this.token).subscribe(
      response => {
        if(response.tfaEnabled) {
          this.isTfaEnabled = true
        }
      },
      error => {
        console.error(error)
        this.errorMessage = 'The link is expired or invalid!\nYou will be redirected to Login page in 4 seconds';
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 4000);
      }
    );

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

  changePassword() {

    if (this.changePasswordForm.valid) {
      const formValue = this.changePasswordForm.value;

      // Create ChangePasswordRequest object
      const resetRequest: ResetPasswordRequest = {
        email: this.email,
        newPassword: formValue.newPassword,
        confirmNewPassword: formValue.confirmPassword
      };

      // Call the AuthService changePassword method
      this.authService.resetPassword(resetRequest).subscribe(
        response => {
          this.errorMessage = ''
          this.message = 'Password has been reseted!\nYou will be redirected to Log in page in 4 seconds';
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 4000);
        },
        error => {
          // Handle error
          console.error('Error reseting password', error);
          this.errorMessage = "Some error occured"
        }
      );
    }
  }

  verifyTfa() {
    const verifyRequest: TfaCodeVerificationRequest = {
      email: this.email,
      code: this.otpCode
    };
    this.authService.verifyTfaCode(verifyRequest)
      .subscribe({
        next: (response) => {
          this.isTfaEnabled = false
        }
      });
  }

}
