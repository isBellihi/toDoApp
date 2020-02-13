import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { MainComponent } from './main/main.component';
import { TaskComponent } from './task/task.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MainComponent, TaskComponent],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    SharedModule
  ],
  exports: [
    
  ]
})
export class ToDoModule { }
