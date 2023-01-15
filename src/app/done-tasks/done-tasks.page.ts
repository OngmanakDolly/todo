import { Component, OnInit } from '@angular/core';
import { ServService } from '../serv.service';

@Component({
  selector: 'app-done-tasks',
  templateUrl: './done-tasks.page.html',
  styleUrls: ['./done-tasks.page.scss'],
})
export class DoneTasksPage implements OnInit {
  selectedDate='Date'
  allactivities:any[]=[]
  dateValue:any
  currentDayDoneActivities:any[]=[]
  formatedDate:any
  constructor(private service:ServService) { }

  ngOnInit() {
  }

  async dateChanged(value:any){
    console.log(value);
    this.formatedDate=value;
    let maDate=new Date(value);
    if(await this.service.getData("Activites"))
    {
      this.allactivities=await this.service.getData("Activites");
      let b=this.allactivities.filter(s => s.annee==maDate.getFullYear() && s.mois==maDate.getMonth() && s.jour==maDate.getDate() && s.done==1);
    this.currentDayDoneActivities=b;
    } 
    
  }

}
