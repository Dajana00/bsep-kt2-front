import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { RefreshTokenRequest } from 'src/app/model/refreshTokenRequest.model';
import { TfaCodeVerificationRequest } from 'src/app/model/tfaCodeVerificationRequest.model';
import { UserTokenState } from 'src/app/model/userTokenState.model';
import { ChangePasswordRequest } from 'src/app/model/change-password-request.model';
import { ResetPasswordRequest } from 'src/app/model/reset-password-request.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private access_token = '';
  userClaims: any = null;
  
  refreshTokenRequest:RefreshTokenRequest={
    refreshToken: '',
    username: '',
    password: ''
  }
  private loginSource = new BehaviorSubject<boolean>(false);
  public loginObserver = this.loginSource.asObservable();

  public passChangeSource = new BehaviorSubject<boolean>(false);
  public passChangeObserver = this.passChangeSource.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    //localStorage.clear();
    this.userClaims = this.jwtHelper.decodeToken();
    if (this.userClaims) this.loginSource.next(true);
  }

 

  login(loginRequest: Credential): Observable<UserTokenState> {
    console.log('u servisu',loginRequest)
    return this.http
      .post<UserTokenState>('http://localhost:8081/api/authentication/login', loginRequest)
      .pipe(
        map((res) => {
          console.log('Login success');
          console.log(res);
          if(res.tfaEnabled && !res.accessToken) {
            return res
          }

          if (res.accessToken && res.refreshToken) {
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);

            // Decode the token and handle potential errors
            try {
              this.userClaims = this.jwtHelper.decodeToken();
              console.log('User claims:', this.userClaims);
            } catch (error) {
              console.error('Error decoding token:', error);
            }

            this.getUserId();
            this.getUsername();
            this.access_token = res.accessToken;
            this.loginSource.next(true);
        } else {
          console.error('Tokens missing in response:', res);
        }
        
        return res
        })
      );
  }

  verifyTfaCode(verificationRequest: TfaCodeVerificationRequest) {
    return this.http.post<UserTokenState>
    (`http://localhost:8081/api/authentication/verifyTfaCode`, verificationRequest);
  }

  verifyAccount(email: string, id: number, token: string, expiry: number): Observable<UserTokenState> {

    let params = new HttpParams()
    .set('email', email)
    .set('id', id.toString())
    .set('token', token)
    .set('expiry', expiry.toString());
    
    return this.http.get<UserTokenState>
    (`http://localhost:8081/api/authentication/verify`, {params});
  }

  setUserClaims(): void {
    this.userClaims = this.jwtHelper.decodeToken();
  }

  setAccessToken(token: any) {
    this.access_token = token;
  }

  setLoginSource(ls: boolean) {
    this.loginSource.next(ls);
  }

  passwordlessLogin(token: string): Observable<UserTokenState> {
    // Make an HTTP request to the server to exchange the token for access and refresh tokens
    return this.http.get<UserTokenState>('http://localhost:8081/api/authentication/passwordlessLogin', {
      params: {
        token: token
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.loginSource.next(false);
    this.userClaims = null;
    this.access_token = '';
  }

  isLogged(): boolean {
    if (!this.jwtHelper.tokenGetter()) return false;
    return true;
  }

  getUserRole(): string {
    return this.userClaims?.role || '';
  }
  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getAccessToken() {
    return this.access_token;
  }

  
  getUserId(): number {
    console.log('id',this.userClaims.id)
    return this.userClaims.id;
  }

  getUsername(): string {
    console.log("ooooo",this.userClaims.email);
    return this.userClaims.email;
    
  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<RefreshTokenRequest> {
    console.log("POzvana metoda");
    console.log("Refresh token", refreshTokenRequest.refreshToken);
    console.log("Access token", localStorage.getItem('token'));
    return this.http.post<RefreshTokenRequest>('http://localhost:8081/api/authentication/refresh-token', refreshTokenRequest);
  }
  
 
  getCurrentUser() {
    // Pretpostavimo da vraća podatke o trenutno ulogovanom korisniku
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  
  isEmailChecked(id:number): Observable<Boolean> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Boolean>('http://localhost:8081/api/authentication/isEmailChecked/'+ id ,{headers});
  }

  sendLoginLink(email: string): Observable<boolean> {
    const url = `http://localhost:8081/api/authentication/sendPasswordlessLoginLink?email=${encodeURIComponent(email)}`;
    return this.http.get<boolean>(url);
  }

  changePassword(request: ChangePasswordRequest): Observable<any> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    //console.log(token)
    //console.log(request.userId)
    return this.http.patch<any>('http://localhost:8081/api/users/changePassword', request, {headers}); 
  }

  sendResetPasswordLink(email: string): Observable<any> {
    return this.http.get<any>('http://localhost:8081/api/authentication/sendResetPasswordLink', {
      params: {
        email: email
      },
      observe: 'response'
    });
  }

  resetPasswordRedirect(token: string): Observable<UserTokenState> {
    return this.http.get<UserTokenState>('http://localhost:8081/api/authentication/resetPasswordRedirect', {
      params: {
        token: token
      }
    });
  }

  resetPassword(request: ResetPasswordRequest) : Observable<any> {
    return this.http.post<any>('http://localhost:8081/api/authentication/resetPassword', request); 
  }
  

 
}
