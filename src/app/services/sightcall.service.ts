import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, tap} from "rxjs";
import {Data} from "../models/data.model";
import {Appointments} from "../models/appointments.model";

@Injectable({
  providedIn: 'root'
})
export class SightCallService {
  private apiUrl = 'https://appointment-ppr.sightcall.com/api/appointments';
  private apiKey = 'w7kPvNc3qyzASMMET17QYDMOsusgVWTp';

  constructor(private http: HttpClient) {}

  createAppointment(appointmentData: Data): Observable<Data> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      'X-Authorization': `Token ${this.apiKey}`
    });

    return this.http.post<Data>(this.apiUrl, { data: appointmentData }, { headers });
  }

  getAppointments(): Observable<Appointments> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      'X-Authorization': `Token ${this.apiKey}`
    });

    return this.http.get<Appointments>(this.apiUrl, { headers });
  }
}
