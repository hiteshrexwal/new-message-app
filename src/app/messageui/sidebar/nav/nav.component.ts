import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from '../../../services/login-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MessagelistService} from '../../../services/messagelist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  closeResult: string;
  user:any;
  searchUserForm: FormGroup;
  findfriendsubmitted=false;
  friend:any;
  nouser:any;
  newRequest:any;
  addedFriends:any;
  public isCollapsed = true;
  constructor(private formBuilder: FormBuilder,private modalService: NgbModal,private service:LoginService,private messageService:MessagelistService,private router: Router) {}

  ngOnInit() {
    this.service.getUserDetails().subscribe((data)=>{
      this.user=`${data.json().firstname} ${data.json().lastname}`;
      //console.log(data.json().username);
      this.messageService.changeuser(data.json().username);
     
    });
    this.searchUserForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]]
    });
    this.getFriendRequest();
    this.getAddedFriends();
  }

  get l() { return this.searchUserForm.controls; }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmit() {
    this.findfriendsubmitted=true;
    // stop here if form is invalid
    if (this.searchUserForm.invalid) {
        return;
    }
    console.log(this.searchUserForm.value);
    this.service.findfriends(this.searchUserForm.value.email).subscribe((data)=>{
      //console.log(data.json());
      if(data.json().message){
        this.friend=data.json().message;
        this.nouser=true;
      }
      else{
        this.friend=`${data.json().firstname} ${data.json().lastname}`
        this.nouser=false;
      }
    });
  }

  addNewFriend(){
    this.service.addfriend(this.searchUserForm.value.email).subscribe((data)=>{
      //console.log(data.json());
      if(data.json()){
        alert("Friend Added Sucessfully");
      }
      else{
        alert("Some Problem Occured");
      }
   })
  }

  getFriendRequest(){
    this.service.getnewRequest().subscribe((data)=>{
      //console.log(data.json());
      this.newRequest=data.json();
   })
  }

  getAddedFriends(){
    this.service.getAddedFriends().subscribe((data)=>{
      //console.log(data.json());
      this.addedFriends=data.json();
   })
  }

  callAll(content){
    this.open(content);
    
    
  }

  acceptRequest(sender){
    this.service.acceptRequest(sender).subscribe((data)=>{
      if(data.json()){
        alert(data.json().message);
        this.getFriendRequest();
        this.getAddedFriends();
      }
   })
  }

  logOut(){
    this.service.logout().subscribe(()=>{
      this.router.navigate(['/login']);
    });
  }
}
