import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Company } from '../model/company.model';
import { Administrator } from '../model/administrator.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  private apiUrl = 'http://localhost:8081/api';


  getAllEmployees(): Observable<User[]> {
    console.log("Usao u employees")
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<User[]>('http://localhost:8081/api/users/getAllEmployees' ,{headers});
  }

  getAllClients(): Observable<User[]> {
    console.log("Usao u clinents")
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<User[]>('http://localhost:8081/api/client/getAllClients' ,{headers});
  }
  getAllCompanies(): Observable<Company[]> {
    console.log("Usao u clinents")
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Company[]>('http://localhost:8081/api/users/getAllCompanies' ,{headers});
  }
  
  getAdminById(id: number): Observable<Administrator> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Administrator>('http://localhost:8081/api/users/getAdminById/'+id);
  }

  updateAdmin(admin: Administrator,id:number): Observable<any> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>('http://localhost:8081/api/users/editAdmin/'+id, admin);
  }
}