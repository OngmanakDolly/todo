import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import {HttpClient, HttpClientModule} from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FullCalendarModule, HttpClientModule,
    IonicStorageModule.forRoot({
    name: 'todolist',
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB],
  }),CommonModule,FormsModule],
  
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
