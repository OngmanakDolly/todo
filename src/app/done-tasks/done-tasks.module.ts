import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoneTasksPageRoutingModule } from './done-tasks-routing.module';

import { DoneTasksPage } from './done-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoneTasksPageRoutingModule
  ],
  declarations: [DoneTasksPage]
})
export class DoneTasksPageModule {}
