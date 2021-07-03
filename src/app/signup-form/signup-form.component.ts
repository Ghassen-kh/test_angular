import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from '../services/fire-base.service';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  isSignedIn = false;
  constructor(public firebaseService: FireBaseService, private route: ActivatedRoute, private router: Router){
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
      this.router.navigate(['home']);
    }
  }

  handleLogout(){
    this.isSignedIn = false;
  }
}

