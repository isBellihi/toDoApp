import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/todo']);
     }
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      this.isLoading = true;
      if (this.loginForm.invalid) {
          return;
      }
      this.isLoading = true;
      this.authenticationService.login(this.f.email.value, this.f.password.value)
          .then(credentials => {
            this.router.navigate([this.returnUrl]);
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
          })
  }

  register(){
    this.isLoading = true;
    this.authenticationService.register(this.loginForm.value)
    .then(credentials => {
      this.isLoading = false;
      this.router.navigate([this.returnUrl]);
    })
    .catch(err => {
      console.log(err);
      this.isLoading = false;
    });
  }
}