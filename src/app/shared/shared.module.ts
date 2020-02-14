import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { MaterialModule } from '../material.module';
import { TaskComponent } from './components/task/task.component';
import { MainComponent } from '../to-do/main/main.component';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  exports:[
    MaterialModule,
    TaskComponent,
    AngularFireDatabaseModule
  ],
  providers: [AngularFirestore],
  entryComponents: [MainComponent],
  bootstrap: [],


})
export class SharedModule { }
