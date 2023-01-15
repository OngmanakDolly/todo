import { Component, OnInit } from '@angular/core';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(private service:ServService) { }
selectedDate='Date'
allactivities:any[]=[]
dateValue:any
currentDayActivities:any[]=[]
formatedDate:any
  ngOnInit() {
  }

  async dateChanged(value:any){
    console.log(value);
    this.formatedDate=value;
    let maDate=new Date(value);
    if(await this.service.getData("Activites"))
    {
      this.allactivities=await this.service.getData("Activites");
      let b=this.allactivities.filter(s => s.annee==maDate.getFullYear() && s.mois==maDate.getMonth() && s.jour==maDate.getDate());
    this.currentDayActivities=b;
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
  }

}
