import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(public  auth:  AngularFireAuth, public  router:  Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string): Promise<void> {
    console.log(email, password);
    return this.auth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
          console.log(credential);
          if(credential.user) {
            localStorage.setItem('currentUser', JSON.stringify(credential.user));
            this.currentUserSubject.next(credential.user);
          }
      });
  }

  register(user: UserModel) {
    delete user.id;
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(credentials => {
      console.log(credentials);
      if(credentials.user) {
        localStorage.setItem('currentUser', JSON.stringify(credentials.user));
        this.currentUserSubject.next(credentials.user);
      }
    });
}

  logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
