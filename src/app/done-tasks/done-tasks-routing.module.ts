import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoneTasksPage } from './done-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: DoneTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoneTasksPageRoutingModule {}
