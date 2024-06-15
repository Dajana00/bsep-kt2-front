import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Company } from '../model/company.model';
import { Administrator } from '../model/administrator.model';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:8081/api';

  getAllEmployees(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:8081/api/users/getAllEmployees');
  }

  getAllClients(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:8081/api/client/getAllClients');
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('https://localhost:8081/api/users/getAllCompanies');
  }
  
  getAdminById(id: number): Observable<Administrator> {
    return this.http.get<Administrator>(`https://localhost:8081/api/users/getAdminById/${id}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:8081/api/users/getEmployeeById/${id}`);
  }

  updateAdmin(admin: Administrator, id: number): Observable<any> {
    return this.http.put<any>(`https://localhost:8081/api/users/editAdmin/${id}`, admin);
  }

  updateEmployee(admin: Employee, id: number): Observable<any> {
    return this.http.put<any>(`https://localhost:8081/api/users/editEmployee/${id}`, admin);
  }

  registerAdmin(admin: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(`${this.apiUrl}/users/registerAdmin`, admin);
  }

  registerEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/users/registerEmployee`, employee);
  }

  blockOrUnblock(user: User): Observable<User> {
    return this.http.put<User>(`https://localhost:8081/api/users/blockOrUnblock`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`https://localhost:8081/api/users/getAllUsers`);
  }
}
