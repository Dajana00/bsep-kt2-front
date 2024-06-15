import { Component, OnInit } from '@angular/core';
import { AdminProfileService } from '../service/admin-profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../infrastructure/authentication/auth.service';
import { Administrator } from '../model/administrator.model';
import { Role } from '../model/user.model';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  constructor(private service: AdminProfileService,private router:Router,private authService:AuthService){}

admin:Administrator={
  isPredefined: false,
  firstName: '',
  lastName: '',
  firstLogging: false,
  blocked: false,
  id: 0,
  email: '',
  password: '',
  role:Role.ADMINISTRATOR,
  emailChecked: false,
  city: '',
  country: '',
  phone: ''
}
employee:Employee={
  firstName: '',
  lastName: '',
  firstLogging: false,
  id: 0,
  blocked: false,
  email: '',
  password: '',
  role:Role.EMPLOYEE,
  emailChecked: false,
  city: '',
  country: '',
  phone: ''
}
  ngOnInit(): void {
    if(this.authService.getUserRole()[0]=='ADMINISTRATOR'){
      this.loadAdminData();
    }else if(this.authService.getUserRole()[0]=='EMPLOYEE'){
      this.loadEmployeeData();
    }
  }
  newPassword: string = '';
  confirmPassword: string = '';
 

  

  changePasswordFirstLogin() {
   
    if (this.newPassword === this.confirmPassword) {
      if(this.authService.getUserRole()[0]=='ADMINISTRATOR'){
      this.admin.password = this.confirmPassword;
      this.admin.firstLogging = false;
      this.service.updateAdmin(this.admin,this.authService.getUserId()).subscribe(
        () => {
          console.log('Password changed successfully.');
          alert('Password updated successifully');
          this.router.navigate(['/adminProfile']);
        },
        (error:any) => {
          console.error('Failed to change password:', error);
          alert('Error changing password: ' + error.message);
        }
      );
    }else if(this.authService.getUserRole()[0]=='EMPLOYEE'){


      this.employee.password = this.confirmPassword;
      this.employee.firstLogging = false;
      this.service.updateEmployee(this.employee,this.authService.getUserId()).subscribe(
        () => {
          alert('Password updated successifully');
          this.router.navigate(['/adminProfile']);
        },
        
        (error:any) => {
          alert('Error changing password: ' + error.message);
        }
      );
    } }else {
      alert('Passwords are not same');
    }
  
    }
  


  loadAdminData(): void {
    this.service.getAdminById(this.authService.getUserId()).subscribe({
      next: (data: Administrator) => {
        this.admin = data;
        console.log("Vraceni admin: ",this.admin);
       
      },
      error: (err) => {
        console.error('Error loading admin data', err);
      }
    });
  }

  
  loadEmployeeData(): void {
    this.service.getEmployeeById(this.authService.getUserId()).subscribe({
      next: (data: Employee) => {
        this.employee = data;
        console.log("Vraceni employee: ",this.employee);
      
      },
      error: (err) => {
        console.error('Error loading admin data', err);
      }
    });
  }
}
