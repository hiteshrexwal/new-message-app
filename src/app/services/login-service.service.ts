import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:Http) {
  }

  checkUserOnline(u){
    return this.http.post('/getstatus',{
      user:u,
    });
  }
  
  getnewRequest(){
    return this.http.get(`/api/friends/newrequest`);
  }

  logout(){
    return this.http.get(`/api/user/logout`);
  }

  getAddedFriends(){
    return this.http.get(`/api/friends/addedfriends`);
  }

  getUser(user,pass){
    return this.http.post(`/api/user/login`,
    { username:user,
      password:pass         
    });
  }

  addfriend(friendid){
    return this.http.post('/api/friends/addfriend',{
      friendid: friendid
    });
  }
  
  findfriends(user){
    return this.http.post('/api/user/findfriend',{
      username:user
    });
  }

  checkUser(){
   return this.http.get('/api/user/checkuser');
  }

  getUserDetails(){
    return this.http.get('/api/user/getuser');
  }

  createUser(user,pass,fname,lname){
    return this.http.post(`/api/user/signup`,
    { username:user,
      password:pass ,
      firstname:fname,
      lastname:lname        
    });
  }

  acceptRequest(sender){
    return this.http.put(`/api/friends/acceptRequest`,
    { senderid:sender       
    });
  }
  
}
