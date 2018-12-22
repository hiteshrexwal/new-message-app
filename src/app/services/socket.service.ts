import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  sendMessage(event:string , msg: any){
    this.socket.emit(event, msg);
  }

  getMessage() {
    return this.socket.fromEvent("send_msg_from_server");
  }
  getPendingMsg() {
    return this.socket.fromEvent("pending_msg");
  }
}
