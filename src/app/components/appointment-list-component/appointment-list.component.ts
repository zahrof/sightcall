import { Component, OnInit } from '@angular/core';
import {SightCallService} from "../../services/sightcall.service";
import {map} from "rxjs";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  public availableSlots: any = [];

  constructor(private sightCallService: SightCallService) { }

  ngOnInit(): void {
    this.loadAvailableSlots();
  }

  loadAvailableSlots(): void {
    const agentId = '19185'; // ID de l'agent SightCall
     const now = new Date();
    const startDate = now.toISOString().replace('Z', '+02:00'); // Date de début des créneaux
    const endDate = '2020-12-31T12:00:00.000+02:00'; // Date de fin des créneaux

    this.sightCallService.getAppointments().subscribe(res => console.log('res: ', res));

    this.sightCallService.getAvailableSlots(agentId, startDate, endDate).pipe(
      map(response => {
        console.log('response: ', response);
        this.availableSlots = response.data;
      })
    ).subscribe();

  }
}
