import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LoginComponent } from './layout/login/login.component';
import { MatCardModule } from '@angular/material/card';

import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatPseudoCheckboxModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './layout/home/home.component';
import { ClientRegisterFormComponent } from './client-register/client-register-form/client-register-form.component';
import { AllRequestsComponent } from './requests/all-requests/all-requests.component';
import { EmailComponent } from './email/email/email.component';
import { RejectDialogComponent } from './dialog/reject-dialog/reject-dialog.component';
import { TokenInterceptor } from './infrastructure/interceptor/TokenInterceptor';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EditAdminProfileComponent } from './edit-admin-profile/edit-admin-profile.component';
import { ClientProfileComponent } from './client-profile/client-profile/client-profile.component';
import { LinkInvalidComponent } from './email/link-invalid/link-invalid.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { RegisterAdminsComponent } from './register-admins/register-admins.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordlessLoginComponent } from './layout/passwordless-login/passwordless-login.component';
import { PasswordlessLoginRedirectiorComponent } from './layout/passwordless-login-redirectior/passwordless-login-redirectior.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { BlockUsersPageComponent } from './block-users-page/block-users-page.component';
import { CaptchaComponent } from './captcha/captcha/captcha.component';
import { NgxCaptchaModule } from 'ngx-captcha';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ClientRegisterFormComponent,
   AllRequestsComponent,
   EmailComponent,
   RejectDialogComponent,
   AdminProfileComponent,
   EditAdminProfileComponent,
   ClientProfileComponent,
   LinkInvalidComponent,
   EmployeeProfileComponent,
   RegisterAdminsComponent,
   ChangePasswordComponent,
   PasswordlessLoginComponent,
   PasswordlessLoginRedirectiorComponent,
   ChangePasswordFormComponent,
   ResetPasswordFormComponent,
   BlockUsersPageComponent,
   CaptchaComponent,
   ResetPasswordPageComponent
  ],
    

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    MatSnackBarModule,
    NgxCaptchaModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
