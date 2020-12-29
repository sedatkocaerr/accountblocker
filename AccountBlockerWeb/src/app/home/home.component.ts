import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/Service/Authentication.service';
import { User } from 'src/Model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  userList:User[];
  constructor(
    private authenticationService:AuthenticationService,
    private userService:UserService,
    private router: Router) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x=>this.currentUser=x);
    this.getUserlist();
  }

  getUserlist()
  {
    this.userService.getAllUsers().subscribe((data:any)=>{
      console.log(data.data);
        this.userList=data.data;
    });
  }

  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
