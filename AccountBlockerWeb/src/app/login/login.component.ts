import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Service/user.service';
import { AlertService } from 'src/Service/alert.service';
import { AuthenticationService } from 'src/Service/Authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/Model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  subscription: Subscription;
  currentUser: User;

  constructor(private userService:UserService,
     private alertService:AlertService,
     private formBuilder: FormBuilder,
     private router: Router,
     private authenticationService:AuthenticationService) {}

  ngOnInit() {
    if(this.authenticationService.currentUserValue)
    {
      this.router.navigate(['/']);
    }
    this.createLoginForm();
  }

  get formValidation() { return this.loginForm.controls; }

  onSubmitLogin()
  {
    this.submitted=true;
    this.alertService.clear();

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.formValidation.email.value,this.formValidation.password.value) .subscribe(
      (data:any) => {
        if(data.status)
        {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("createdDate", new Date().toString());
          const authdata ={
            ...data.data,
            tokenKey:data.token
          }
          this.authenticationService.login(data.data);
          this.router.navigate(['/']);
        }
        else
        {
          this.alertService.error(data.error.message);
        }
         
      },
      error => {
      this.alertService.error(error.error.error.message);
    });
  }

  createLoginForm()
  {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
