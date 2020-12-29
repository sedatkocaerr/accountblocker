import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { User } from 'src/Model/User';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;
  public data: any;
  socketUrl:string="http://localhost:3001";
  constructor() {
    // Connect Socket with server URL
    this.socket = io(this.socketUrl);
  }
  public ngOnInit(): void {
    
  }

  public addNewOnlineUser(user:User):void {
    this.socket.emit('addNewUser', user);
    //  this.socket.on('addNewUser', data => {
    //    this.data = data;
    //  });
  }

}
