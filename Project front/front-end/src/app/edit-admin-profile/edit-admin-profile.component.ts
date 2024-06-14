import { Component } from '@angular/core';
import { Administrator } from '../model/administrator.model';
import { AuthService } from '../infrastructure/authentication/auth.service';
import { AdminProfileService } from '../service/admin-profile.service';
import { Router } from '@angular/router';
import { Role } from '../model/user.model';

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.css']
})
export class EditAdminProfileComponent {
  admin: Administrator = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    blocked: false,
    isPredefined: false,
    id: 0,
    role: Role.ADMINISTRATOR,
    emailChecked: false,
    city: '',
    country: '',
    phone: '',
    firstLogging: false
  };

  constructor(private authService: AuthService, private adminService: AdminProfileService, private router: Router) {}

  ngOnInit(): void {
    this.loadAdminData();
  }

  loadAdminData(): void {
    

    this.adminService.getAdminById(this.authService.getUserId()).subscribe({
      next: (data: Administrator) => {
        this.admin = data;
      },
      error: (err) => {
        console.error('Error loading admin data', err);
      }
    });
  }

  onSubmit(): void {
    this.adminService.updateAdmin(this.admin,this.admin.id).subscribe({
      next: (response) => {
        console.log('Admin updated successfully', response);
        this.router.navigate(['/adminProfile']); // Preusmeravanje nakon uspešnog ažuriranja
      },
      error: (err) => {
        console.error('Error updating admin', err);
      }
    });
  }

}
