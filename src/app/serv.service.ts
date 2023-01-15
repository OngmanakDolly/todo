import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

@Injectable({
  providedIn: 'root'
})
export class ServService {

  constructor(private storage:Storage) { }

  async initialize()
  {
    await this.storage.create();
    await this.storage.defineDriver(CordovaSQLiteDriver);
  }

  async writeData(table:string,list:any){

    await this.storage.set(table,list);
  }

  async getData(table:string)
  {
    return await this.storage.get(table);
  }

  async deleteTable(table:any)
  {
    this.storage.remove(table);
    

  }
}
