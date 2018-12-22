import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../services/login-service.service';
import {MessagelistService} from '../../../services/messagelist.service';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {

  addedFriends:any;
  currentSelectedFriend:number;
  itemCLicked:any;
  constructor(private service:LoginService,private messageService:MessagelistService) { }

  ngOnInit() {
    this.getAddedFriends();
    this.messageService.currentSelected.subscribe(selection => this.currentSelectedFriend = selection);
    this.messageService.currentClickedItem.subscribe(selection => this.itemCLicked = selection);
  }

  getAddedFriends(){
    this.service.getAddedFriends().subscribe((data)=>{
      console.log(data.json());
      this.addedFriends=data.json();
   })
  }
  itemClicked(item,pos){
    this.messageService.changeSelection(pos);
    this.messageService.changeClickedItem(item);
    //console.log(this.itemCLicked);
  }

}
