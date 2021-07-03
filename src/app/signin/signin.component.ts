import { Component, OnInit } from '@angular/core';
import { FireBaseService } from '../services/fire-base.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isSignedIn = false;
  constructor(public firebaseService: FireBaseService){
  }

  ngOnInit(){
    if (localStorage.getItem('user')!== null){
      this.isSignedIn = true;
    }else{
      this.isSignedIn = false;  
    }
  }
  async onSignup(email: string, password: string){
    await this.firebaseService.signup(email, password);
    if (this.firebaseService.isLoggedIn){
      this.isSignedIn = true;
    }
  }
  async onSignin(email: string, password: string){
    await this.firebaseService.signin(email, password);
    if (this.firebaseService.isLoggedIn){
      this.isSignedIn = true;
    }
  }
  handleLogout(){
    this.isSignedIn = false;
  }
}
