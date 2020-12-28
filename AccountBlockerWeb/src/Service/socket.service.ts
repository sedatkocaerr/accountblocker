import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

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
    this.socket.on('notification', data => {
      this.data = data;
    });
  }
}
