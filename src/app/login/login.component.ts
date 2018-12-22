import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import {LoginService} from '../services/login-service.service';
import {Router} from '@angular/router';

//declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  loginForm: FormGroup;
  signupForm: FormGroup;
  loginsubmitted = false;
  signupsubmitted = false;
  constructor(private formBuilder: FormBuilder,private service:LoginService,private router: Router) { }

  ngOnInit() {
    $(document).ready(function(e){
      $("#flipToSignUp").click(function(){
          $("#main").css("-webkit-animation-name","showSignUp"); 
          $("#main").css("transform","translate(-50%,-50%) rotateY(180deg)");
          
          $("#signUpForm").css("-webkit-animation-name","hideSignIn"); 
          $("#signUpForm").css("transform","translate(-50%,-50%) rotateY(0deg)");
      });

      $("#flipToSignIn").click(function(){
        $("#main").css("-webkit-animation-name","hideSignUp"); 
        $("#main").css("transform","translate(-50%,-50%) rotateY(0deg)");
        
        $("#signUpForm").css("-webkit-animation-name","showSignIn"); 
        $("#signUpForm").css("transform","translate(-50%,-50%) rotateY(180deg)");
       });
       
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
    });
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
    });
  }
  get f() { return this.signupForm.controls; }
  get l() { return this.loginForm.controls; }

  onSubmit() {
    this.loginsubmitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.service.getUser(this.loginForm.value.email,this.loginForm.value.password)
    .subscribe((data)=>{
      if(!data.json()){
        alert('Username or email incorrect');
      }
      else{
       
        this.router.navigate(['/messages']);
      }
    })
    
  }
  onSignUpFormSubmit() {
    this.signupsubmitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }
    this.service.createUser(this.signupForm.value.email,this.signupForm.value.password
      ,this.signupForm.value.firstname,this.signupForm.value.lastname)
      .subscribe((data)=>{
        if(data.json()){
          $("#flipToSignIn").click();
        }
        //this.router.navigate(['/login']);
      })

    //alert('SUCCESS!! :-)')
  }
  
  


}
