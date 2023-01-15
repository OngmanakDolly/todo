import { Component,ViewChild } from '@angular/core';
import { aW } from '@fullcalendar/core/internal-common';
import { IonModal, MenuController } from '@ionic/angular';
import { menuController } from "@ionic/core";
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { ServService } from './serv.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonModal) modal!: IonModal;

  constructor( private menucontroller: MenuController,private storage:Storage, private service:ServService) {
     this.service.initialize();
      this.defaultCat();
      this.filterItems();
      this.setIn=setInterval(()=> { this.getCat() }, 1000);
  }
  setIn:any
  cate={nom:"",image:""}
  categorie=[
    {"nom":"Indefini","image":"../../assets/img/etude.jpg"},
  ]
  allcategories:any[]=[]

  async basculemenu(){
    await this.menucontroller.toggle();
  }

  async save()
  {
    console.log(this.cate);
    this.allcategories=await this.service.getData("Categories");
    console.log(this.allcategories);
    if(this.cate.nom!="")
    {
      this.allcategories.push(this.cate);
    console.log("liste categories",this.allcategories);
    await this.service.writeData("Categories",this.allcategories);
    }
    
    this.modal.dismiss();
  }

  async getCat()
  {
    this.allcategories=await this.service.getData("Categories");
  }

  

  


  async defaultCat()
  {
    
      console.log("Hello");
      if(!(await this.service.getData("Categories")))
      {
        this.service.writeData("Categories",this.categorie);
      }
      
  }

  async filterItems()
  {
    let b:any[]=[]
    b=await this.service.getData("Categories");
    let a=b.filter(s => s.nom=="Sport");
    console.log("result",a);
    
  }
  
}
