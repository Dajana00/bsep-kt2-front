import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ClientRegisterFormComponent } from './client-register/client-register-form/client-register-form.component';
import { HomeComponent } from './layout/home/home.component';
import { AllRequestsComponent } from './requests/all-requests/all-requests.component';
import { EmailComponent } from './email/email/email.component';
import { AuthGuard } from './infrastructure/authentication/AuthGuard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EditAdminProfileComponent } from './edit-admin-profile/edit-admin-profile.component';
import { ClientProfileComponent } from './client-profile/client-profile/client-profile.component';
import { LinkInvalidComponent } from './email/link-invalid/link-invalid.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';

import { RegisterAdminsComponent } from './register-admins/register-admins.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordlessLoginComponent } from './layout/passwordless-login/passwordless-login.component';
import { PasswordlessLoginRedirectiorComponent } from './layout/passwordless-login-redirectior/passwordless-login-redirectior.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { BlockUsersPageComponent } from './block-users-page/block-users-page.component';




const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'requests', component: AllRequestsComponent , canActivate: [AuthGuard], data: { role: 'ADMINISTRATOR' }},
  { path: 'email', component: EmailComponent , canActivate: [AuthGuard] },
  { path: 'adminProfile', component: AdminProfileComponent , canActivate: [AuthGuard], data: { role: 'ADMINISTRATOR' } },
  { path: 'editAdminProfile', component: EditAdminProfileComponent , canActivate: [AuthGuard], data: { role: 'ADMINISTRATOR' } },
  { path: 'client-register', component: ClientRegisterFormComponent },
  { path: 'client-profile', component: ClientProfileComponent, canActivate: [AuthGuard], data: { role: 'CLIENT' } },
  { path: 'confirmAccount', component: EmailComponent },
  {path: 'email-link-invalid', component:LinkInvalidComponent},
  {path:'employeeProfile',component:EmployeeProfileComponent},
  { path: 'createAdmin', component: RegisterAdminsComponent , canActivate: [AuthGuard] },
  { path: 'changePassword', component: ChangePasswordComponent , canActivate: [AuthGuard] },
  { path: 'passwordlessLogin', component: PasswordlessLoginComponent },
  { path: 'redirectPasswordlessLogin', component: PasswordlessLoginRedirectiorComponent },
  { path: 'changePasswordForm', component: ChangePasswordFormComponent, canActivate: [AuthGuard] },
  { path: 'resetPasswordForm', component: ResetPasswordFormComponent },
  { path: 'resetPasswordPage', component: ResetPasswordPageComponent },
  { path: 'blockUsersPage', component: BlockUsersPageComponent , canActivate: [AuthGuard], data: { role: 'ADMINISTRATOR' } },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
