import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/Service/Authentication.service';
import { SocketService } from 'src/Service/Socket.service';
import { User } from 'src/Model/User';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-multiUserAlert',
  templateUrl: './multiUserAlert.component.html',
  styleUrls: ['./multiUserAlert.component.scss']
})
export class MultiUserAlertComponent implements OnInit {

  constructor(private socketService:SocketService,private authenticationService:AuthenticationService,
    private router: Router,private userService:UserService) { }

  ngOnInit() {

  }
}
