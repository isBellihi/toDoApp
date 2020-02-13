import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoModule } from './to-do/to-do.module';


const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./to-do/to-do.module').then(mod => mod.ToDoModule),
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ 

}
