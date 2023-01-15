import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor(private storage : Storage) { }

  await this.storage.create();
  await this.storage.defineDriver(CordovaSQLiteDriver);
  await storage
  await setActivities(list){

  }
}
