import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { platformBrowser } from '@angular/platform-browser';
import { PopUpComponent } from './pop-up/pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [MainComponent, PopUpComponent],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    SharedModule,
    MatDialogModule
  ],
  exports: [
    MainComponent,
    PopUpComponent
  ],
  entryComponents: [PopUpComponent],
  bootstrap: [],

})
export class ToDoModule { }

