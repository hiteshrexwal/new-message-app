import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login-service.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private router: Router,private service:LoginService) { }

  ngOnInit() {
    this.service.checkUser().subscribe((data)=>{
      //console.log(data.json());
      if(data.json()){
        this.router.navigate(['/messages']);
      }
      else{
        this.router.navigate(['/login']);
      }
    });
    
  }

}
