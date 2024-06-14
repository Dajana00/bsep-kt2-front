import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RefreshTokenRequest } from 'src/app/model/refreshTokenRequest.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private jwtHelper: JwtHelperService, private router: Router) {}

  request: RefreshTokenRequest = {
    refreshToken: '',
    username: '',
    password: ''
  };

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRole = route.data['role'];
    if (this.authService.isLogged()) {
      const accessToken = localStorage.getItem('token');
      if (this.jwtHelper.isTokenExpired(accessToken)) {
        const refreshToken = localStorage.getItem('refreshToken');
        const username = this.authService.getUsername();
        const password = 'lal';
        this.request.password = password;
        if (refreshToken !== null) {
          this.request.refreshToken = refreshToken;
        }
        if (username) {
          this.request.username = username;
        }
        return this.authService.refreshToken(this.request).pipe(
          map((res) => {
            localStorage.setItem('token', res.refreshToken);
            console.log('Vraceni novi token: ', localStorage.getItem('token'));
            return this.isAuthorized(requiredRole);
          }),
          catchError((err) => {
            console.log("Error: ", err)
            this.router.navigate(['/login']);
            return of(false);
          })
        );
      }
      if (this.isAuthorized(requiredRole)) {
        //console.log("USAO TRUE")
        return of(true)
      }else {
        //console.log("USAO ELSE")
        this.router.navigate(['/home'])
        return of(false)
      }
    } else {
      console.log('Nije ulogovan!');
      this.router.navigate(['/login']);
      return of(false);
    }
  }

  isAuthorized(requiredRole: string): boolean {
    if (!requiredRole) {
        return true; 
    }

    var userRole = this.authService.getUserRole();
    // console.log("REQUIRED ROLE:", requiredRole);
    // console.log("USER ROLE:", userRole);
    // console.log("Type of USER ROLE:", typeof userRole);
    // console.log("Type of REQUIRED ROLE:", typeof requiredRole);

    if (Array.isArray(userRole)) {
      userRole = userRole.join(','); 
    }
    
    return userRole.trim().toUpperCase() === requiredRole.trim().toUpperCase();
}

}
