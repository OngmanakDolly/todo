import { Component, OnInit, ViewChild } from '@angular/core';
import {CalendarOptions} from '@fullcalendar/core'
import { s } from '@fullcalendar/core/internal-common';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { IonModal } from '@ionic/angular';
//import { DatePipe } from '@angular/common';
import { ServService } from '../serv.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
myDate :Date
priorite:number=0
selectedDateMode='date'
selectedHourMode='time'
act={id:0,nom:"",categorie:"",jour:1,mois:1,annee:1,heure:1,minute:0,"isChecked":false,"priorite":0}
allactivities:any[]=[]
dayactivities:any[]=[]
activitiesfiltred:any[]=[]
dateValue:any
timeValue:any
setIn:any
filtre=false
isSearching=false
categories:any[]=[]
isShowDatePicker=false
isShowHourPicker=false
results:any
formatedDate=new Date(Date.now());
formatedTime=new Date(Date.now());
/*catSlideOpts={
  freeMode:true,
  slidesPerview:3.5,
  slidesOffsetBefore:11,
  spaceBeetween:10
};
*/
  constructor(private service:ServService) {
    //this.myDate=this.datePipe.transform(this.myDate, 'yyyy-MM-dd')!
    this.myDate= new Date(Date.now());
    this.setIn=setInterval(()=> { this.getCat() }, 1000);
    this.getAct();
    this.filterItems();
    this.getCat();
    this.activitiesfiltred=this.dayactivities
   }

   @ViewChild(IonModal) modal!: IonModal;

  ngOnInit() {
    //this.service.initialize();
    //this.getCat();
    //this.service.deleteTable("Activites");
    
    
  }
  
  showDatePicker()
  {
    this.isShowDatePicker=true;
  }

  showHourPicker()
  {
    this.isShowHourPicker=true;
  }


  setCatValue(value:any){
    this.act.categorie=value;
  }
  async getCat()
  {
    if(await this.service.getData("Categories"))
    {
      this.categories=await this.service.getData("Categories");
    }
    else{
      this.service.writeData("Categories",{nom:"defaut",image:""});
      this.categories=await this.service.getData("Categories");
    }
    
  }

  async getAct()
  {
    if(await this.service.getData("Activites"))
    {
      this.allactivities=await this.service.getData("Activites");
    }
    
  }

  async deleteActivity(act:any)
  {
    let b:any[]=[];
    for (let i = 0; i < this.allactivities.length; i++) {
      
      if(this.allactivities[i].id!=act.id)
      {
        b.push(this.allactivities[i]);
      }  
    }
    this.service.writeData("Activites",b);
    this.allactivities=await this.service.getData("Activites");
    this.filterItems();
  }

  dateChanged(value:any){
    console.log(value);
    //this.formatedDate = format(parseISO(value), 'MMM d, yyyy');
    this.formatedDate=value;
    console.log(this.formatedDate);
    this.isShowDatePicker=false;
    let maDate=new Date(value);
    this.act.jour=maDate.getDate();
    this.act.mois=maDate.getMonth();
    this.act.annee=maDate.getFullYear();
  }

  timeChanged(value:any){
    console.log(value);
    this.formatedTime=value;
    let maDate=new Date(value);
    this.act.heure=maDate.getHours();
    this.act.minute=maDate.getMinutes();
    this.isShowHourPicker=false;
    
  }

  async save()
  {
    console.log("categorie new activite",this.act.categorie);
      if(await this.service.getData("Activites"))
    {
      this.allactivities=await this.service.getData("Activites");
      this.act.id=this.allactivities[this.allactivities.length-1].id+1;
      this.allactivities.push(this.act);
    }
    else{
      this.act.id=1;
      this.allactivities=[this.act];  
    }
    //this.act.date=this.formatedDate;
    console.log(this.allactivities);
    await this.service.writeData("Activites",this.allactivities);
    console.log(this.act);
    this.filterItems();
    
    this.modal.dismiss();
  }

  searchItems(ev: any) {
    let val = ev.target.value; //on récupère la saisie de l’utilisateur
    this.results = this.activitiesfiltred.filter((item) => {
    let txtNom = item.nom;
    this.isSearching=true;
    if(txtNom.toLowerCase().indexOf(val.toLowerCase())==0){
      this.isSearching=false;
    }
    return txtNom.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
    }

  handleChange(ev:any) {
    this.act.categorie = ev.target.value;
  }
/*
  async checkedIt(act:any,bol:boolean)
  {
    let b:any[]=[];
    for (let i = 0; i < this.allactivities.length; i++) {
      
      if(this.allactivities[i].id!=act.id)
      {
      this.allactivities[i].isChecked=bol;
      }  
    }
    this.service.writeData("Activites",b);
    this.allactivities=await this.service.getData("Activites");
  }
  
*/
public checkboxFacePlotting(e:any,obj:any) {
    if (e.currentTarget.checked) {
      console.log("=========FACE PLOTTING ENABLED");
      obj.isChecked = true;
      //this.checkedIt(obj,false)

    } else {
      console.log("=========FACE PLOTTING DISABLED");
      obj.isChecked = false;
      //this.checkedIt(obj,true)
    }
  }


  priority()
  {
    if(this.priorite==0)
    {
      this.priorite=1;
    }
    else{
      this.priorite=0;
    }
  }

 
  async filterItems()
  {
    this.filtre=false;
    let a:any[]=[]
    if(await this.service.getData("Activites"))
    {
      a=await this.service.getData("Activites");
      let maDate=new Date(Date.now());
      console.log("Date actuelle",maDate.getDate(),maDate.getMonth(),maDate.getFullYear());
      console.log("activité",a);
    let b=a.filter(s => s.annee==maDate.getFullYear() && s.mois==maDate.getMonth() && s.jour==maDate.getDate());
   this.dayactivities=b;
   this.activitiesfiltred=this.dayactivities
    console.log("result b",b);
    }
    
  }

  async filterByCategorie(cat:any)
  {
    this.filtre=true
    let a:any[]=[]
    if(await this.service.getData("Activites"))
    {
      a=await this.service.getData("Activites");
      let maDate=new Date(Date.now());
    let b=a.filter(s => s.annee==maDate.getFullYear() && s.mois==maDate.getMonth() && s.jour==maDate.getDate() && s.categorie.nom==cat);
   this.activitiesfiltred=b;
    console.log("result b",b);
    }
    
  }
  
  

}
