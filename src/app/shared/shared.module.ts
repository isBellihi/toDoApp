import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../../environments/environment';
import { MaterialModule } from '../material.module';
import { TaskComponent } from './components/task/task.component';
import { MainComponent } from '../to-do/main/main.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  exports:[
    MaterialModule,
    TaskComponent,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AngularFirestoreModule, AngularFireDatabaseModule, AngularFireAuthModule],
  entryComponents: [MainComponent],
  bootstrap: [],


})
export class SharedModule { }
