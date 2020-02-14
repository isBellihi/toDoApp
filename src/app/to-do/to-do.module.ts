import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ToDoRoutingModule } from './to-do-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MainComponent, PopUpComponent],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    MainComponent,
    PopUpComponent
  ],
  entryComponents: [PopUpComponent],
  bootstrap: []

})
export class ToDoModule { }
