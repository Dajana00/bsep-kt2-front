import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogged : boolean=false
  userRole: string = '';
  constructor(
    private router: Router,
    private authService: AuthService 
  ) {
    this.authService.loginObserver.subscribe((val) => {
      this.isLogged = val;
      
      
        if (this.isLogged) {
          this.userRole = this.authService.getUserRole()
          console.log("USER ROLE : ",this.userRole);

        }
      
        
      
    });

    
  }
  ngOnInit(): void {
    this.authService.loginObserver.subscribe((val) => {
      this.isLogged = val;
      console.log('isLogged', this.isLogged)
      
     
    });

    
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
