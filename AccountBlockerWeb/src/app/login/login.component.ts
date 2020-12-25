import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Service/user.service';
import { AlertService } from 'src/Service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor(private userService:UserService , private alertService:AlertService) { }

  ngOnInit() {
    // chechk token controll
  }


  onSubnitLogin()
  {
    this.userService.login(this.email,this.password) .subscribe(
      data => {
         console.log(data);
      },
      error => {
           this.alertService.error(error.error.error.message);
          // this.loading = false;
      });
  }

}
