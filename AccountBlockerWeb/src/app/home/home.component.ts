import { Component, OnDestroy, OnInit,HostListener } from '@angular/core';
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
export class HomeComponent implements OnInit {

  currentUser: User;
  addedOnlineuser:boolean;
  onlineUserCount:number=0;
  userList:User[];
  onlineUserList:User[];
  connectAccountCount:number=0;
  constructor(
    private authenticationService:AuthenticationService,
    private userService:UserService,
    private socketService:SocketService,
    private router: Router) { }

  ngOnInit()
  {
    this.authenticationService.currentUser.subscribe(x=>this.currentUser=x);
    this.userService.getOnlineUserCount(this.currentUser.userId,
      window.localStorage.getItem('token')).subscribe((data:any) =>{
        console.log(data);
      if(data.respnseObject.data)
      {
        this.router.navigate(['/multiConnectionError']);
      }
      else
      {
        if(data.respnseObject.totalOnlineCount)
        {
          if(data.respnseObject.totalOnlineCount.length+1>=3)
          {
            this.router.navigate(['/multiAccountError']);
          }
          else
          {
            this.startOperation();
          }
        }
        else
        {
          this.startOperation();
        }
        
      }
     });
  }


  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    window.alert("Are you sure you want to close this page ?");
    if(this.addedOnlineuser)
    {
      this.removeOnlineUser();
    }
    return false;
  }

  startOperation()
  {
    this.addedOnlineuser=true;
    this.addOnlineUser();
    this.getUserlist();
    this.getOnlineUserList();
  }

  getUserlist()
  {
    this.userService.getAllUsers().subscribe((data:any)=>{
        this.userList=data.data;
    });
  }

  addOnlineUser()
  {
    const userData =
    {
      Id:this.authenticationService.currentUserValue.userId,
      name:this.authenticationService.currentUserValue.name,
      token:window.localStorage.getItem("token")
    }

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
    const userData =
    {
      Id:this.authenticationService.currentUserValue.userId,
      name:this.authenticationService.currentUserValue.name,
      token:window.localStorage.getItem("token")
    }

    this.socketService.removeUser(userData);
  }
  
  logout()
  {
    this.beforeunloadHandler();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  

}
