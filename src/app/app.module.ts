import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SightCallService} from "./services/sightcall.service";
import {AppointmentListComponent} from "./components/appointment-list-component/appointment-list.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AppointmentListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    SightCallService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
