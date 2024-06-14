import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from '../employee.service';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {

  employeeForm!: FormGroup;
  employee!: Employee ;

  constructor(private fb: FormBuilder,private employeeService:EmployeeService,private authService:AuthService) {
    this.getEmployee();
  }

  populateForm(){
    this.employeeForm = this.fb.group({
      id: [this.employee.id],
      email: [this.employee.email],
      password: [this.employee.password],
      role: [this.employee.role],
      emailChecked: [this.employee.emailChecked]
    });
  }

  getEmployee(){
    const id = this.authService.getUserId();
    this.employeeService.getEmployee(id).subscribe({
        next:(res)=>{
          console.log(res)
          this.employee=res
          this.populateForm();
        },
        error:(err)=> {
          console.log(err)
        },
    })
  }

  updateEmployee(){
 

    const passwordControl = this.employeeForm.get('password');
    if (passwordControl) {
      this.employee.password = passwordControl.value;
    }

    this.employeeService.updateEmployee(this.employee).subscribe({
      next:(res)=>{
        this.employee=res;
        console.log('Apdejtovanii')
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

}
