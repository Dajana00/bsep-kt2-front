import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../infrastructure/authentication/auth.service';
import { Router } from '@angular/router';
import { AdminProfileService } from '../service/admin-profile.service';
import { Administrator } from '../model/administrator.model';
import { Role } from '../model/user.model';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-register-admins',
  templateUrl: './register-admins.component.html',
  styleUrls: ['./register-admins.component.css']
})
export class RegisterAdminsComponent implements OnInit {

  constructor(  private fb: FormBuilder,
    private service: AdminProfileService,
    private router: Router){}

  userForm!: FormGroup;
  
  admin:Administrator={
    isPredefined: false,
    firstName: '',
    lastName: '',
    id: 0,
    blocked: false,
    email: '',
    password: '',
    role: Role.ADMINISTRATOR,
    emailChecked: false,
    city: '',
    country: '',
    phone: '',
    firstLogging: false
  }

  employee:Employee={
    firstName: '',
    lastName: '',
    id: 0,
    email: '',
    password: '',
    blocked: false,
    role: Role.EMPLOYEE,
    emailChecked: false,
    city: '',
    country: '',
    phone: '',
    firstLogging: false
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      userRole: ['ADMIN', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  register() {
    if (this.userForm && this.userForm.valid) {
      const role = this.userForm.value.userRole;
      console.log("Rolaa",role);
      if(role){
      console.log("Rolaa usao u admina",role);

        this.admin.email = this.userForm.value.email;
        this.admin.password= this.userForm.value.password;
        this.admin.firstName= this.userForm.value.firstName;
        this.admin.lastName= this.userForm.value.lastName;
        this.service.registerAdmin(this.admin).subscribe({
          next: () => {
            console.log('Registration successful');
            this.router.navigate(['/adminProfile']);
          },
          error: () => {
            console.error('Registration error');
          }
        });

      }else{
      console.log("Rolaa usao u employeer",role);

        this.employee.email = this.userForm.value.email;
        this.employee.password= this.userForm.value.password;
        this.employee.firstName= this.userForm.value.firstName;
        this.employee.lastName= this.userForm.value.lastName;

        this.service.registerEmployee(this.employee).subscribe({
          next: () => {
            console.log('Registration successful');
            this.router.navigate(['/adminProfile']);
          },
          error: () => {
            console.error('Registration error');
          }
        });

      }
      }
    }
  }
  

