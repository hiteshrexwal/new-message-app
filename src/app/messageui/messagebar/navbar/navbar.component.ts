import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../services/login-service.service';
import {MessagelistService} from '../../../services/messagelist.service';

@Component({
  selector: 'app-message-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  item:any;
  fulldetail:any;
  position:number;
  constructor(private service:LoginService,private messageService:MessagelistService) { }

  ngOnInit() {
    this.messageService.currentSelected.subscribe(selection => this.position = selection);
    this.messageService.currentClickedItem.subscribe((selection) =>{
      this.item = selection;
      this.service.findfriends(this.item.friendid).subscribe((data)=>{
        console.log(data.json());
        this.fulldetail=data.json();
        this.messageService.changeFriend(this.fulldetail);
      })
    });
    
  }

}
