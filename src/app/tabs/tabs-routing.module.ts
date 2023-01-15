import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'accueil',
          loadChildren: () => import('../accueil/accueil.module').then( m => m.AccueilPageModule)
      },
      {
        path: 'calendar',
          loadChildren: () => import('../calendar/calendar.module').then( m => m.CalendarPageModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('../tasks/tasks.module').then( m => m.TasksPageModule)
      },
    ]
    }
    
       
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
