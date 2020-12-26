import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/Service/Authentication.service';
import { User } from 'src/Model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x=>this.currentUser=x);
  }

}
