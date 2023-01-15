import { Component, OnInit, ViewChild } from '@angular/core';
import { ServService } from '../serv.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  myDate :Date
  priorite:number=0
  selectedDateMode='date'
  selectedHourMode='time'
  act={id:0,nom:"",categorie:"",jour:1,mois:1,annee:1,heure:1,minute:0,"isChecked":false,"priorite":0,done:0}
  allactivities:any[]=[]
  dayactivities:any[]=[]
  activitiesfiltred:any[]=[]
  dateValue:any
  timeValue:any
  isSearching=false
  results:any
  setIn:any
  categories:any[]=[]
  isShowDatePicker=false
  isShowHourPicker=false
  formatedDate=new Date(Date.now());
  formatedTime=new Date(Date.now());
  
  constructor(private service:ServService) { 
    //this.myDate=this.datePipe.transform(this.myDate, 'yyyy-MM-dd')!
    this.myDate= new Date(Date.now());
    this.setIn=setInterval(()=> { this.getCat() }, 1000);
    this.getAct();
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
      this.activitiesfiltred=this.allactivities;
    }
    
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
    this.act.heure=maDate.getTime();
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
    this.getAct();
    console.log(this.act);
    
    this.modal.dismiss();
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
    this.getAct();
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
  

public checkboxFacePlotting(e:any,obj:any) {
    if (e.currentTarget.checked) {
      console.log("=========FACE PLOTTING ENABLED");
      obj.isChecked = true;
    } else {
      console.log("=========FACE PLOTTING DISABLED");
      obj.isChecked = false;
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

  /*categories=[
    {"nom":"Tout","image":"../../assets/img/etude.jpg"},
    {"nom":"Travail","image":"../../assets/img/travail.jpg"},
    {"nom":"Anniversaire","image":"../../assets/img/anniversaire.jpg"},
    {"nom":"Etude","image":"../../assets/img/etude.jpg"},
    {"nom":"Sport","image":"../../assets/img/sport.jpg"},
    {"nom":"Alimentation","image":"../../assets/img/alimentation.jpg"},
  ]
  */

 
  /*
  async filterItems()
  {
    let a:any[]=[]
    if(await this.service.getData("Activites"))
    {
      a=await this.service.getData("Activites");
      let maDate=new Date(Date.now());
      console.log("Date actuelle",maDate.getDate(),maDate.getMonth(),maDate.getFullYear());
      console.log("activité",a);
      console.log("activité 5",a[5].annee,a[5].mois,a[5].jour);
    let b=a.filter(s => s.annee==maDate.getFullYear() && s.mois==maDate.getMonth() && s.jour==maDate.getDate());
   this.dayactivities=b;
    console.log("result b",b);
    }
    
  }
  */

  async filterByCategorie(cat:any)
  {
    let a:any[]=[]
    if(await this.service.getData("Activites"))
    {
      a=await this.service.getData("Activites");
    let b=a.filter(s => s.categorie.nom==cat);
   this.activitiesfiltred=b;
    console.log("result b",b);
    }
    
  }

}
