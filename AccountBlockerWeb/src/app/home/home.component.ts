import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/Service/Authentication.service';
import { User } from 'src/Model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/Service/user.service';
import { SocketService } from 'src/Service/Socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  currentUser: User;
  userList:User[];
  onlineUserList:User[];
  connectAccountCount:number=0;
  constructor(
    private authenticationService:AuthenticationService,
    private userService:UserService,
    private socketService:SocketService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.removeOnlineUser();
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x=>this.currentUser=x);
    this.getUserlist();
    this.addOnlineUser();
    this.getOnlineUserList();
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  getUserlist()
  {
    this.userService.getAllUsers().subscribe((data:any)=>{
        this.userList=data.data;
    });
  }

  addOnlineUser()
  {
    const userData ={Id:this.authenticationService.currentUserValue.userId,name:this.authenticationService.currentUserValue.name,token:window.localStorage.getItem("token")}
    this.socketService.addNewUser(userData);
  }

  getOnlineUserList()
  {
    this.socketService.getUserList().subscribe(data =>{
      console.log(data);
    })
  }

  removeOnlineUser()
  {
    const userData ={Id:this.authenticationService.currentUserValue.userId,name:this.authenticationService.currentUserValue.name,token:window.localStorage.getItem("token")}
    this.socketService.removeUser(userData);
  }
  
  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
