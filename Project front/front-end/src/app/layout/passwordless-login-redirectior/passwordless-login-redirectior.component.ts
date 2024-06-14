import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';
import { TfaCodeVerificationRequest } from 'src/app/model/tfaCodeVerificationRequest.model';

@Component({
  selector: 'app-passwordless-login-redirectior',
  templateUrl: './passwordless-login-redirectior.component.html',
  styleUrls: ['./passwordless-login-redirectior.component.css']
})
export class PasswordlessLoginRedirectiorComponent {

  isTfaEnabled: boolean = false
  email = ''
  otpCode = ''

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear()
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      this.email = params['email'];
      if (token) {
        // Call a service method to exchange token for access and refresh tokens
        this.authService.passwordlessLogin(token).subscribe(
          response => {

            if(response.tfaEnabled) {
              this.isTfaEnabled = true
              return
            }
            const accessToken = response.accessToken;
            const refreshToken = response.refreshToken;
            
            // Store tokens or handle them as needed, e.g., store in localStorage
            localStorage.setItem('token', accessToken as string);
            localStorage.setItem('refreshToken', refreshToken as string);

            this.authService.setUserClaims();
            this.authService.setAccessToken(accessToken);
            this.authService.setLoginSource(true);

            // Redirect user to home page or any other desired location
            this.router.navigateByUrl('/home');
          },
          error => {
            console.log("Error with passwordless login:")
            console.log(error);
            this.authService.logout();
            this.router.navigateByUrl('/login');
          }
        );
      }
    });
  }

  verifyTfa() {
    const verifyRequest: TfaCodeVerificationRequest = {
      email: this.email,
      code: this.otpCode
    };
    this.authService.verifyTfaCode(verifyRequest)
      .subscribe({
        next: (response) => {

          localStorage.setItem('token', response.accessToken as string);
          localStorage.setItem('refreshToken', response.refreshToken as string);

          this.authService.setUserClaims();
          this.authService.setAccessToken(response.accessToken as string);
          this.authService.setLoginSource(true);
          this.router.navigate(['home']);
        }
      });
  }

}
