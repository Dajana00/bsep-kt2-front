import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ClientRegisterFormComponent } from './client-register/client-register-form/client-register-form.component';
import { HomeComponent } from './layout/home/home.component';
import { AllRequestsComponent } from './requests/all-requests/all-requests.component';
import { EmailComponent } from './email/email/email.component';




const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'client-register', component: ClientRegisterFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'requests', component: AllRequestsComponent },
  { path: 'email', component: EmailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
