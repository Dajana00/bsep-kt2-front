import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/service/keycloak/keycloak.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  userRole: string = '';

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) { }

  ngOnInit(): void {
    if (this.keycloakService.profile) {
      console.log(this.keycloakService.roles)
      this.isLogged = true
      this.setUserRole
     }
  }

  setUserRole(): void {
    //console.log("USLOO u roles")
    const roles = this.keycloakService.roles;
    if (roles.includes('ADMINISTRATOR')) {
      this.userRole = 'ADMINISTRATOR';
    } else if (roles.includes('CLIENT')) {
      this.userRole = 'CLIENT';
    } else if (roles.includes('EMPLOYEE')) {
      this.userRole = 'EMPLOYEE';
    } else {
      this.userRole = 'UNKNOWN';
    }
    console.log("USER ROLE:", this.userRole);
  }

  onLogout(): void {
    this.keycloakService.logout();
    this.router.navigate(['login']);
  }
}
