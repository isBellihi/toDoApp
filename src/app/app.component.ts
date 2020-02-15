import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'toDoApp';
  constructor(private authService: AuthenticationService,
    private router: Router){}
  public currentUser = this.authService.currentUser;
  public userValue: User;

  public toDay: Date;
  ngOnInit(){
    this.toDay = new Date();
    this.currentUser.subscribe(user => {
      this.userValue = user;
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
