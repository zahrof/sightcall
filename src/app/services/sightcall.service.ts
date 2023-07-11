import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SightCallService {
  private apiUrl = 'https://appointment-ppr.sightcall.com/api'; // SightCall API base URL

  constructor(private http: HttpClient) { }

  /**
   * Method used to get appointments
   * @param agentId
   * @param dateTime
   */
  getAppointments(): Observable<any> {
    const url = `${this.apiUrl}/appointments`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/vnd.api+json')
      .set('X-Authorization', `Token w7kPvNc3qyzASMMET17QYDMOsusgVWTp`);

    return this.http.get(url, { headers });
  }


  /**
   * Method used to create an appointment
   * @param agentId
   * @param dateTime
   */
  createAppointment(agentId: string, dateTime: string): Observable<any> {
    const url = `${this.apiUrl}/appointments`;
    const body = {
      data: {
        type: 'appointments',
        attributes: {
          agent_id: agentId,
          date_time: dateTime
        }
      }
    };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/vnd.api+json')
      .set('X-Authorization', `Token w7kPvNc3qyzASMMET17QYDMOsusgVWTp`);

    return this.http.post(url, body, { headers });
  }

  /**
   * Method for retrieving available slots for an agent
   * @param agentId
   * @param startDate
   * @param endDate
   */
  getAvailableSlots(agentId: string, startDate: string, endDate: string): Observable<any> {
    const url = `${this.apiUrl}/agents/${agentId}/availability?start_date=${startDate}&end_date=${endDate}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/vnd.api+json')
      .set('X-Authorization', `Token w7kPvNc3qyzASMMET17QYDMOsusgVWTp`);

    return this.http.get(url, { headers });
  }

  /**
   * Method for checking slot availability
   * @param slotId
   */
  checkSlotAvailability(slotId: string): Observable<any> {
    const url = `${this.apiUrl}/slots/${slotId}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/vnd.api+json')
      .set('X-Authorization', `Token w7kPvNc3qyzASMMET17QYDMOsusgVWTp`);

    return this.http.get(url, { headers });
  }
}
