import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from '../services/fire-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  constructor(public firebaseService: FireBaseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.firebaseService.logout();
    this.isLogout.emit();
    this.router.navigate(['']);
  }

}
