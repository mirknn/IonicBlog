import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { trigger, transition, animate, style } from '@angular/animations'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('enter:', [
        style({opacity: 0}),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0}))
      ])
    ])
  ]
})
export class HomePage implements OnInit{
  authenticated = false;

  constructor(private authService: AuthService){ }

  ngOnInit(){
    this.authService.getUserSubject().subscribe(authState => {
      this.authenticated = authState ? true: false;
    });
  }

  loginAdmin() {
    this.authService.login('admin');
  }  

  loginUser() {
    this.authService.login('user');
  }

  logout(){
    this.authService.logout();
  }
}
