import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { TaskComponent } from './components/task/task.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';


@NgModule({
  declarations: [TaskComponent, PopUpComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule
  ]
})
export class SharedModule { }
