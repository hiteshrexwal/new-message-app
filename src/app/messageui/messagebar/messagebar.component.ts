import { Component, OnInit } from '@angular/core';
import {MessagelistService} from '../../services/messagelist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SocketService} from '../../services/socket.service';

@Component({
  selector: 'messagebar',
  templateUrl: './messagebar.component.html',
  styleUrls: ['./messagebar.component.css']
})
export class MessagebarComponent implements OnInit {

  friend:any;
  
  messageForm:FormGroup;
  messagelist={};
  user:any;

  constructor(private messageService:MessagelistService,private formBuilder: FormBuilder,private socket:SocketService) { }

  ngOnInit() {
    this.messageService.currentFriend.subscribe(selection =>{
      this.friend = selection;
      if(!this.messagelist[this.friend.username]){
        this.messagelist[this.friend.username]=[];
      }
    });
    this.messageService.currentUser.subscribe(selection => this.user = selection);
    this.messageForm = this.formBuilder.group({
      msg:['', Validators.required],
    });
    this.socket.getMessage().subscribe((data)=>{
      
      let x=JSON.parse(JSON.stringify(data));
      console.log(x);
      if(this.messagelist[x.sender]){
        this.messagelist[x.sender].push({msg:x.message,send:0});
      }
      else{
        this.messagelist[x.sender]=[{msg:x.message,send:0}];
      }
      //console.log(this.messagelist);
    });
    this.socket.getPendingMsg().subscribe((data)=>{
      let x=JSON.parse(JSON.stringify(data));
      for(let i in x){
        if(this.messagelist[x[i].sender]){
          this.messagelist[x[i].sender].push({msg:x[i].message,send:0});
        }
        else{
          this.messagelist[x[i].sender]=[{msg:x[i].message,send:0}];
        }
      }
    })
  }
  get l() { return this.messageForm.controls; }

  onSubmit(){
    if (this.messageForm.invalid) {
      return;
    }
    console.log(this.user);
    this.messagelist[this.friend.username].push({msg:this.messageForm.value.msg,send:1});
    this.socket.sendMessage('send_msg',{message:this.messageForm.value.msg,
                                        friendId:this.friend.username,
                                        sender:this.user});
    this.messageForm.reset();
  }

}
