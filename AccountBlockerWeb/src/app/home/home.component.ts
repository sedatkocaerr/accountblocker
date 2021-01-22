import { Component, OnDestroy, OnInit,HostListener } from '@angular/core';
import { AuthenticationService } from 'src/Service/Authentication.service';
import { User } from 'src/Model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/Service/user.service';
import { SocketService } from '../../Service/socket.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[DatePipe]
})
export class HomeComponent implements OnInit {

  currentUser: User;
  addedOnlineuser:boolean;
  onlineUserCount:number=0;
  userList:User[];
  onlineUserList:User[];
  connectAccountCount:number=0;
  ipAddress = '';
  userToken:string=null;
  constructor(
    private authenticationService:AuthenticationService,
    private userService:UserService,
    private socketService:SocketService,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit()
  {
    this.authenticationService.currentUser.subscribe(x=>this.currentUser=x);
    this.userToken=window.localStorage.getItem("token");
    this.userService.getOnlineUserCount(this.currentUser.userId,
      window.localStorage.getItem('token')).subscribe((data:any) =>{

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

  async startOperation()
  {
    let daa = await this.getIPAddress();
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
    console.log(this.ipAddress);
    const userData =
    {
      Id:this.authenticationService.currentUserValue.userId,
      name:this.authenticationService.currentUserValue.name,
      token:window.localStorage.getItem("token"),
      connectionTime:  this.datePipe.transform(new Date(), 'yyyy-MM-dd-HH:mm '),
      ipAdress:this.ipAddress
    }
    this.socketService.addNewUser(userData);
  }

  getOnlineUserList()
  {
    this.socketService.getUserList().subscribe(data =>{
      this.onlineUserList=data;
      this.connectAccountCount=data.length;
    })
  }

  removeOnlineUser()
  {
    const userData =
    {
      Id:this.authenticationService.currentUserValue.userId,
      token:window.localStorage.getItem("token")
    }
    this.socketService.removeUser(userData);
  }

  async getIPAddress()
  {
   await this.userService.getUserIpAdress().then((data:any)=>{
      this.ipAddress = data.ip;
     
   });
   console.log(this.ipAddress)
  }

  logout()
  {
    this.beforeunloadHandler();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
}
