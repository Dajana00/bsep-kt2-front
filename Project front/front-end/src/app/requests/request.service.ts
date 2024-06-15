import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requestt } from '../model/requestt.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}

  getRequests(): Observable<[]> {
    return this.http.get<[]>('https://localhost:8081/api/requests/getAll');
  }

  acceptRequest(request: Requestt): Observable<Requestt> {
    return this.http.put<Requestt>('https://localhost:8081/api/requests/accept', request);
  }

  rejectRequest(request: Requestt, reason: string): Observable<Requestt> {
    return this.http.put<Requestt>(`https://localhost:8081/api/requests/reject/${reason}`, request);
  }

  getRequestByUsername(username: string): Observable<Requestt> {
    return this.http.get<Requestt>(`https://localhost:8081/api/requests/getByUsername/${username}`);
  }
}
