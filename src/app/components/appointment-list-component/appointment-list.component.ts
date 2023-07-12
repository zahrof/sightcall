import { Component, OnInit } from '@angular/core';
import {SightCallService} from "../../services/sightcall.service";
import {Attributes, Data} from "../../models/data.model";
import {Appointments} from "../../models/appointments.model";
import {MatTableDataSource} from "@angular/material/table";
import {min} from "rxjs";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
  appointments: Data[] = []; // Tableau des rendez-vous
  days: string[] = [
    '2023-07-04T10:00:00.000Z',
    '2023-07-05T10:00:00.000Z',
    '2023-07-06T10:00:00.000Z',
    '2023-07-07T10:00:00.000Z',
    '2023-07-08T10:00:00.000Z'
  ].map( day => this.formatDateToDayAndMonth(day));
  timeslots: string[] = []; // Tableau des créneaux horaires

  dynamicColumns: string[] = this.days.map((_, i) => 'day' + i);
  displayedColumns: string[] = ['timeslot', ...this.dynamicColumns];



  constructor(private sightCallService: SightCallService) {}

  ngOnInit() {
    this.getAvailableAppointments();
    this.generateTimeslots();
  }

  getAvailableAppointments() {
    this.sightCallService.getAppointments().subscribe(
      appointments => {
        this.appointments = appointments.data;
        console.log('appointlents ',  this.appointments)
      },
      error => {
        console.log('Une erreur s\'est produite lors de la récupération des rendez-vous.', error);
      }
    );
  }

  formatDateToDayAndMonth(utcDate: string): string {
    const date = new Date(utcDate);

    const formattedDate = date.toLocaleDateString('fr-FR');

    return formattedDate;
  }

  generateTimeslots() {
    const startHour = 9;
    const endHour = 17;
    let minHour = ':00';

    for (let hour = startHour; hour < endHour; hour++) {
      let timeSlotStart = '';
      let timeSlotEnd = '';

      if (minHour === ':00') {
        timeSlotStart = hour.toString().padStart(2, '0') +':00';
        timeSlotEnd = hour.toString().padStart(2, '0') + ':30';
        hour--;
        minHour = ':30';
      } else if (minHour === ':30') {
        timeSlotStart = hour.toString().padStart(2, '0') +':30';
        timeSlotEnd = hour.toString().padStart(2, '0') + ':00';
        minHour = ':00';
      }
      const timeslotRange = timeSlotStart + ' - ' + timeSlotEnd;
      this.timeslots.push(timeslotRange);
    }
  }

  isTimeslotAvailable(timeslot: string, dayIndex: number): boolean {
    const foundAppointment = this.appointments.find(appointment => {
      const appointmentStartTime = new Date(appointment.attributes["start-time"]);
      const appointmentDay = appointmentStartTime.getDate() - 1; // Les jours commencent à 1, donc on soustrait 1 pour l'index

      return (
        appointmentStartTime.getHours() === parseInt(timeslot.substring(0, 2), 10) &&
        appointmentStartTime.getMinutes() === parseInt(timeslot.substring(3), 10) &&
        appointmentDay === dayIndex
      );
    });

    return !foundAppointment;
  }

  createAppointment(timeslot: string, dayIndex: number) {
    const date = new Date(this.days[dayIndex - 1]);
    console.log('date: ', date);
    const attributes: Attributes = {
      "start-time": `2023-07-${date.getDay()}T${timeslot}:00Z`,
      "end-time": `2023-07-${date.getDay()}T${timeslot}:30Z`,
      "agent-display-name": 'Valentin Reinbold',
      "usecase-id": '19185',
      "name": 'Show me',
      "agent-login": 'cbardoux26@gmail.com',
    } as Attributes;

    const data = {
      attributes,
      type : 'appointments'
    } as Data;

    this.sightCallService.createAppointment(data).subscribe(
      response => {
        console.log('Rendez-vous créé :', response);
      },
      error => {
        console.log('Une erreur s\'est produite lors de la création du rendez-vous.', error);
      }
    );
  }

  getWaitingRoomLink(timeslot: string, dayIndex: number) {
    const appointment = this.appointments.find(appointment => {
      const appointmentTime = new Date(appointment.attributes["start-time"]);
      const appointmentDay = appointmentTime.getDate() - 1; // Les jours commencent à 1, donc on soustrait 1 pour l'index

      return (
        appointmentTime.getHours() === parseInt(timeslot.substring(0, 2), 10) &&
        appointmentTime.getMinutes() === parseInt(timeslot.substring(3), 10) &&
        appointmentDay === dayIndex
      );
    });

    if (appointment) {
      return appointment.attributes["guest-default-url"];
    }

    return '';
  }

}
