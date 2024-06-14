import { Component, OnInit } from '@angular/core';
import { AdminProfileService } from '../service/admin-profile.service';
import { User, Role } from '../model/user.model';

@Component({
  selector: 'app-block-users-page',
  templateUrl: './block-users-page.component.html',
  styleUrls: ['./block-users-page.component.css']
})
export class BlockUsersPageComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['email', 'role', 'action'];

  constructor(private adminService: AdminProfileService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        // Filter out ADMINISTRATOR users
        this.users = data.filter(user => user.role != Role.ADMINISTRATOR);
        //console.log(this.users);
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  updateUser(user: User): void {
    user.blocked = !user.blocked; // Toggle the blocked status
    this.adminService.updateUser(user).subscribe({
      next: () => this.loadUsers(), // Refresh the table after updating
      error: (err) => {
        console.error('Error updating user:', err);
        user.blocked = !user.blocked; // Revert change on error
      }
    });
  }

  getRoleName(role: Role): string {
    switch (role) {
      case Role.ADMINISTRATOR:
        return 'Administrator';
      case Role.CLIENT:
        return 'Client';
      case Role.EMPLOYEE:
        return 'Employee';
      default:
        return 'Unknown';
    }
  }
}
