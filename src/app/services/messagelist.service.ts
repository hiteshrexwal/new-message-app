import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagelistService {

  private messageSource = new BehaviorSubject(-1);
  private friendSource = new BehaviorSubject({});
  private itemClicked = new BehaviorSubject({});
  private user = new BehaviorSubject({});

  currentFriend=this.friendSource.asObservable();
  currentSelected = this.messageSource.asObservable();
  currentClickedItem=this.itemClicked.asObservable();
  currentUser=this.user.asObservable();

  constructor() { }

  changeSelection(no: number) {
    this.messageSource.next(no);
  }

  changeClickedItem(item){
    this.itemClicked.next(item);
  }

  changeFriend(f){
    this.friendSource.next(f);
  }

  changeuser(u){
    this.user.next(u);
  }
}
