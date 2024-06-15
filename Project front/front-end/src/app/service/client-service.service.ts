import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { Client } from '../model/client.model';
import { Requestt } from '../model/requestt.model';
import { Commercial } from '../model/commercial.model';
import { CommercialRequest } from '../model/commercial-request.model';
import { AuthService } from '../infrastructure/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://localhost:8081/api'; // Adjust URL to your backend

  private loginSource = new BehaviorSubject<boolean>(false);
  public loginObserver = this.loginSource.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { 
    if (this.authService.userClaims) this.loginSource.next(true);
  }

  registerClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/client/register`, client);
  }

  sendRequest(username: string): Observable<Requestt> {
    return this.http.post<Requestt>(`${this.apiUrl}/requests/create/${username}`, null);
  }

  updateName(id: number, name: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/clientFirmName/${id}/${name}`, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating name:', error);
          return throwError(error);
        })
      );
  }

  updateSurname(id: number, surname: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/surnameFirmPIB/${id}/${surname}`, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating surname:', error);
          return throwError(error);
        })
      );
  }

  updateAddress(id: number, address: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/firmResidentialAddress/${id}/${address}`, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating address:', error);
          return throwError(error);
        })
      );
  }

  updateCity(id: number, city: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/city/${id}/${city}`, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating city:', error);
          return throwError(error);
        })
      );
  }

  updateCountry(id: number, country: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/country/${id}/${country}`, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating country:', error);
          return throwError(error);
        })
      );
  }

  updatePhone(id: number, phone: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/phone/${id}/${phone}`, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating phone:', error);
          return throwError(error);
        })
      );
  }

  updateEmail(id: number, email: string): Observable<boolean> {
    return this.http.put<any>(`${this.apiUrl}/client/email/${id}/${email}`, null)
      .pipe(
        catchError((error) => {
          console.error('Error updating email:', error);
          return of(false); // return observable of false to handle the error
        })
      );
  }

  updateUsername(id: number, username: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/username/${id}/${username}`, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating username:', error);
          return throwError(error);
        })
      );
  }

  getClientData(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/client/get-by/${id}`);
  }

  getClientCommercials(clientId: number): Observable<Commercial[]> {
    return this.http.get<Commercial[]>(`${this.apiUrl}/commercial/get-by/${clientId}`);
  }

  sendCommercialRequest(request: CommercialRequest): Observable<CommercialRequest> {
    return this.http.post<CommercialRequest>(`${this.apiUrl}/commercial-request/create`, request);
  }
}
