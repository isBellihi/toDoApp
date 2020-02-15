import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './auth/authentication.guard';


const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./to-do/to-do.module').then(mod => mod.ToDoModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    loadChildren: () => import('./to-do/to-do.module').then(mod => mod.ToDoModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]

})
export class AppRoutingModule{ 

}
