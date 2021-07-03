import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireBaseService } from '../services/fire-base.service';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
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

  handleLogout(){
    this.isSignedIn = false;
  }
}

