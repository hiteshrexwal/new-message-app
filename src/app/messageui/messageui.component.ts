import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {LoginService} from '../services/login-service.service';
import {MessagelistService} from '../services/messagelist.service';

@Component({
  selector: 'app-messageui',
  templateUrl: './messageui.component.html',
  styleUrls: ['./messageui.component.css']
})
export class MessageuiComponent implements OnInit {

  public clicked=false;

  constructor(private socket:SocketService,private service:LoginService,private messageService:MessagelistService) { }
  ngOnInit() {
    this.service.getUserDetails().subscribe((data)=>{
      //console.log(data);
      this.socket.sendMessage('login',data.json().username);
    })
    this.messageService.currentSelected.subscribe((selection)=>{
      if(selection!=-1){
        this.clicked=true;
      }
    });
    
  }

}
