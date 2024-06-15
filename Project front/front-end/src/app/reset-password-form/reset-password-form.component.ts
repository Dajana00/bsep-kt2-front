import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../infrastructure/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit{

  resetPasswordForm!: FormGroup
  message:string = ''
  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }


  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const formValue = this.resetPasswordForm.value;

      const email = formValue.email

      // Call the AuthService changePassword method
      this.authService.sendResetPasswordLink(email).subscribe(
        response => {
          this.errorMessage = ''
          this.message = 'Password reset link has been sent to your email!\nYou will be redirected to Login page in 4 seconds';
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 4000);
        },
        error => {
          // Handle error
          console.error('Error changing password', error);
          this.errorMessage = "There is no user with such email!"
        }
      );
    }
  }
}
