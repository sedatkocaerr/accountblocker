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

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    window.alert("Are you sure you want to close this page ?");
    if(this.addedOnlineuser)
    {
      this.removeOnlineUser();
    }
    return false
  }

  ngOnInit()
  {
    this.authenticationService.currentUser.subscribe(x=>this.currentUser=x);
    this.userService.getOnlineUserCount(this.currentUser.userId,window.localStorage.getItem('token')).subscribe((data:any) =>{
      if(data.data)
      {
        this.router.navigate(['/multiConnectionError']);
      }
      else
      {
        if(data.totalOnlineCount)
        {
          if(data.totalOnlineCount.length+1>=3)
          {
            this.router.navigate(['/multiAccountError']);
          }
          else
          {
            this.startData();
          }
        }
        else
        {
          this.startData();
        }
        
      }
     });
  }

  startData()
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
    const userData = {
      Id:this.authenticationService.currentUserValue.userId,
      name:this.authenticationService.currentUserValue.name,
      token:window.localStorage.getItem("token"),
      tabId:this.getTabId()}

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
    this.beforeunloadHandler();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  getTabId():number
  {
    let lasttabid= localStorage.getItem("lastTabId");
    let tabid= sessionStorage.getItem("tabId"); 
    let lasttabidint: number;
    console.log("lasttabid: "+lasttabid+" tabid: "+tabid);
    if(tabid === undefined || tabid == null || tabid.length<=0 || !tabid){
        if(lasttabid === undefined || lasttabid == null || lasttabid.length<=0 || !lasttabid){
            sessionStorage.setItem("tabId", "1");
            localStorage.setItem("lastTabId", "1");
            tabid= "1";
        } else {
            lasttabidint= +lasttabid;
            sessionStorage.setItem("tabId", String(++lasttabidint));
            localStorage.setItem("lastTabId", String(lasttabidint));
            tabid= String(lasttabidint);
        }
    }
    console.log("actual tab id is : "+ tabid);
    return Number(tabid);

  }

}
