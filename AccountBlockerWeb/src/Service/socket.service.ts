import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { User } from '../Model/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;
  observable: Observable<User>;
  socketUrl:string="http://localhost:3001";
  constructor() {
    // Connect Socket with server URL
    this.socket = io(this.socketUrl);
  }
  
  public addNewUser(data)
  {
    this.socket.emit('addNewUser',data);
  }

  public removeUser(data)
  {
    this.socket.emit('removeUser',data);
  }

  public getUserList():any{
    return this.observable = new Observable((observer) => 
      this.socket.on('getUserList', (data) => observer.next(data))
    );
  }

  public nonBlockUser():any{
    return this.observable = new Observable((observer) => 
      this.socket.on('multiplyPageBlock',(data) => observer.next(data))
    );
  }

}
