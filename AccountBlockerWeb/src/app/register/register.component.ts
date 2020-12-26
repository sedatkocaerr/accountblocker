import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/Service/user.service';
import { AlertService } from 'src/Service/alert.service';
import { User } from 'src/Model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  counter:number=5;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  successRegister=false;
  user:User;

  constructor(private userService:UserService,
    private alertService:AlertService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
   this.createRegisterForm();
  }

  get formValidation() { return this.registerForm.controls; }

  onSubmitRegister()
  {
    this.submitted=true;
    this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
    }
    
    this.user = Object.assign({}, this.registerForm.value);

    this.userService.register(this.user) .subscribe(
      (data:any) => {
         if(data.status)
         {
            this.alertService.success(data.message,true);
            this.successRegister=true;
            this.startCounter();
         }
         else
         {
            this.alertService.error(data.message);
           
         }
      },
      error => {
           this.alertService.error(error.error.error.message);
    });
  }

  createRegisterForm()
  {
    this.registerForm = this.formBuilder.group({
      name:['',Validators.required],
      surname:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  startCounter() {
    const interval = setInterval(() => {
      if(this.counter > 0) {
        this.counter--;
      } else {
        this.router.navigate(['/login']);
      }
    },1000)
  }

}
