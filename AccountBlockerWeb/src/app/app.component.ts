import { Component,OnInit } from '@angular/core';
import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/Model/User';
import {AuthenticationService} from 'src/Service/Authentication.service';
import { SocketService } from 'src/Service/Socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,
    private socketService:SocketService,
    private router:Router){}
  onlineUserList:User[]=null;
  totalCount:number;
  title = 'AccountBlockerWeb';

  ngOnInit() {
    if(this.authenticationService.currentUserValue)
    {
      console.log("asasas")
    }
  }

   
}
